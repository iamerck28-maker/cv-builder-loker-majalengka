import { create } from 'zustand';
import { CVData, generateId } from '@/types/cv';
import { loadProfiles, saveProfiles, getDefaultData, type ProfileEntry } from './localStorage';

interface ProfileMeta {
  id: string;
  name: string;
}

const MAX_HISTORY = 50;

interface CVStore {
  data: CVData;
  template: 'ats' | 'creative' | 'minimalist';
  language: 'id' | 'en';
  colorScheme: string;
  darkMode: boolean;
  saveStatus: 'idle' | 'saving' | 'saved';
  profiles: ProfileMeta[];
  activeProfileId: string;

  _history: CVData[];
  _future: CVData[];
  canUndo: boolean;
  canRedo: boolean;

  updateData: (data: Partial<CVData>) => void;
  setTemplate: (template: 'ats' | 'creative' | 'minimalist') => void;
  setLanguage: (language: 'id' | 'en') => void;
  setColorScheme: (color: string) => void;
  setDarkMode: (dark: boolean) => void;

  undo: () => void;
  redo: () => void;

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

let pushTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedHistoryPush(prevData: CVData) {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    const s = useCVStore.getState();
    if (JSON.stringify(prevData) === JSON.stringify(s.data)) return;
    const newHistory = [...s._history, prevData].slice(-MAX_HISTORY);
    useCVStore.setState({ _history: newHistory, _future: [], canUndo: true, canRedo: false });
    pushTimer = null;
  }, 500);
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
  _history: [],
  _future: [],
  canUndo: false,
  canRedo: false,

  updateData: (newData) => {
    const prev = get().data;
    set((state) => ({ data: { ...state.data, ...newData }, saveStatus: 'saving' }));
    debouncedHistoryPush(prev);
  },

  undo: () => {
    const { _history, data, _future } = get();
    if (_history.length === 0) return;
    const prev = _history[_history.length - 1];
    set({
      data: prev,
      _history: _history.slice(0, -1),
      _future: [data, ..._future],
      canUndo: _history.length > 1,
      canRedo: true,
      saveStatus: 'saving',
    });
  },

  redo: () => {
    const { _history, data, _future } = get();
    if (_future.length === 0) return;
    const next = _future[0];
    set({
      data: next,
      _history: [..._history, data],
      _future: _future.slice(1),
      canUndo: true,
      canRedo: _future.length > 1,
      saveStatus: 'saving',
    });
  },

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
      _history: [],
      _future: [],
      canUndo: false,
      canRedo: false,
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
        _history: [],
        _future: [],
        canUndo: false,
        canRedo: false,
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
        _history: [],
        _future: [],
        canUndo: false,
        canRedo: false,
      });
    }
  },

  importData: (importedData) => {
    const prev = get().data;
    set((state) => ({
      data: importedData,
      saveStatus: 'saving',
      _history: [...state._history, prev].slice(-MAX_HISTORY),
      _future: [],
      canUndo: true,
      canRedo: false,
    }));
  },

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
      _history: [],
      _future: [],
      canUndo: false,
      canRedo: false,
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
