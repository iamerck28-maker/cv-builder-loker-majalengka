import { create } from 'zustand';
import { CVData, generateId } from '@/types/cv';
import { loadProfiles, saveProfiles, getDefaultData, type ProfileEntry } from './localStorage';

interface ProfileMeta {
  id: string;
  name: string;
}

interface CVStore {
  data: CVData;
  template: 'ats' | 'creative' | 'minimalist';
  language: 'id' | 'en';
  colorScheme: string;
  darkMode: boolean;
  saveStatus: 'idle' | 'saving' | 'saved';
  profiles: ProfileMeta[];
  activeProfileId: string;

  updateData: (data: Partial<CVData>) => void;
  setTemplate: (template: 'ats' | 'creative' | 'minimalist') => void;
  setLanguage: (language: 'id' | 'en') => void;
  setColorScheme: (color: string) => void;
  setDarkMode: (dark: boolean) => void;

  createProfile: (name: string) => void;
  deleteProfile: (id: string) => void;
  renameProfile: (id: string, name: string) => void;
  switchProfile: (id: string) => void;
  importData: (data: CVData) => void;

  loadFromStorage: () => void;
  saveToStorage: () => void;
}

let profileDataCache: Map<string, ProfileEntry> = new Map();

function cacheCurrentProfile() {
  const s = useCVStore.getState();
  profileDataCache.set(s.activeProfileId, {
    id: s.activeProfileId,
    name: s.profiles.find(p => p.id === s.activeProfileId)?.name || 'CV',
    data: s.data,
    template: s.template,
    colorScheme: s.colorScheme,
  });
}

export const useCVStore = create<CVStore>((set, get) => ({
  data: getDefaultData(),
  template: 'ats',
  language: 'id',
  colorScheme: '#1e40af',
  darkMode: false,
  saveStatus: 'idle',
  profiles: [{ id: 'default', name: 'CV Utama' }],
  activeProfileId: 'default',

  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData }, saveStatus: 'saving' })),

  setTemplate: (template) => set({ template, saveStatus: 'saving' }),
  setLanguage: (language) => set({ language, saveStatus: 'saving' }),
  setColorScheme: (color) => set({ colorScheme: color, saveStatus: 'saving' }),

  setDarkMode: (dark) => {
    set({ darkMode: dark, saveStatus: 'saving' });
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark);
    }
  },

  createProfile: (name) => {
    const id = generateId();
    cacheCurrentProfile();
    profileDataCache.set(id, {
      id, name, data: getDefaultData(), template: 'ats', colorScheme: '#1e40af',
    });
    set((state) => ({
      profiles: [...state.profiles, { id, name }],
      activeProfileId: id,
      data: getDefaultData(),
      template: 'ats' as const,
      colorScheme: '#1e40af',
      saveStatus: 'saving',
    }));
  },

  deleteProfile: (id) => {
    const state = get();
    if (state.profiles.length <= 1) return;
    profileDataCache.delete(id);
    const remaining = state.profiles.filter(p => p.id !== id);
    const newActiveId = state.activeProfileId === id ? remaining[0].id : state.activeProfileId;
    if (state.activeProfileId === id) {
      const cached = profileDataCache.get(newActiveId);
      set({
        profiles: remaining,
        activeProfileId: newActiveId,
        data: cached?.data || getDefaultData(),
        template: cached?.template || 'ats',
        colorScheme: cached?.colorScheme || '#1e40af',
        saveStatus: 'saving',
      });
    } else {
      set({ profiles: remaining, saveStatus: 'saving' });
    }
  },

  renameProfile: (id, name) => {
    set((state) => ({
      profiles: state.profiles.map(p => p.id === id ? { ...p, name } : p),
      saveStatus: 'saving',
    }));
  },

  switchProfile: (id) => {
    const state = get();
    if (id === state.activeProfileId) return;
    cacheCurrentProfile();
    const cached = profileDataCache.get(id);
    if (cached) {
      set({
        activeProfileId: id,
        data: cached.data,
        template: cached.template,
        colorScheme: cached.colorScheme,
        saveStatus: 'saving',
      });
    }
  },

  importData: (importedData) => set({ data: importedData, saveStatus: 'saving' }),

  loadFromStorage: () => {
    const saved = loadProfiles();
    if (!saved) return;
    const active = saved.profiles.find(p => p.id === saved.activeId) || saved.profiles[0];
    profileDataCache = new Map(saved.profiles.map(p => [p.id, p]));
    set({
      data: active.data,
      template: active.template,
      colorScheme: active.colorScheme,
      language: saved.language || 'id',
      darkMode: saved.darkMode || false,
      profiles: saved.profiles.map(p => ({ id: p.id, name: p.name })),
      activeProfileId: active.id,
    });
    if (saved.darkMode && typeof document !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
  },

  saveToStorage: () => {
    cacheCurrentProfile();
    const state = get();
    const entries: ProfileEntry[] = state.profiles.map(pm => {
      const c = profileDataCache.get(pm.id);
      return c || { id: pm.id, name: pm.name, data: getDefaultData(), template: 'ats' as const, colorScheme: '#1e40af' };
    });
    saveProfiles({
      activeId: state.activeProfileId,
      language: state.language,
      darkMode: state.darkMode,
      profiles: entries,
    });
    set({ saveStatus: 'saved' });
  },
}));
