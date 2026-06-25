import { CVData, ensureIds } from '@/types/cv';

const PROFILES_KEY = 'cv-builder-profiles';
const OLD_STORAGE_KEY = 'cv-builder-data';

export interface ProfileEntry {
  id: string;
  name: string;
  data: CVData;
  template: 'ats' | 'creative' | 'minimalist';
  colorScheme: string;
}

export interface ProfilesStore {
  activeId: string;
  language: 'id' | 'en';
  darkMode: boolean;
  profiles: ProfileEntry[];
}

function migrateData(data: CVData): CVData {
  return {
    ...data,
    education: ensureIds(data.education || []),
    experience: ensureIds(data.experience || []),
    skills: ensureIds(data.skills || []),
    languages: ensureIds(data.languages || []),
  };
}

export function loadProfiles(): ProfilesStore | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (raw) {
      const parsed: ProfilesStore = JSON.parse(raw);
      parsed.profiles = parsed.profiles.map(p => ({ ...p, data: migrateData(p.data) }));
      return parsed;
    }

    const oldRaw = localStorage.getItem(OLD_STORAGE_KEY);
    if (oldRaw) {
      const old = JSON.parse(oldRaw);
      const migrated: ProfilesStore = {
        activeId: 'default',
        language: old.language || 'id',
        darkMode: false,
        profiles: [{
          id: 'default',
          name: 'CV Utama',
          data: migrateData(old.data || getDefaultData()),
          template: old.template || 'ats',
          colorScheme: old.colorScheme || '#1e40af',
        }],
      };
      localStorage.removeItem(OLD_STORAGE_KEY);
      localStorage.setItem(PROFILES_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveProfiles(store: ProfilesStore): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(store));
  } catch (error) {
    console.error('Failed to save profiles:', error);
  }
}

export function getDefaultData(): CVData {
  return {
    personal: { fullName: '', email: '', phone: '', city: '', linkedin: '', photo: '' },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    languages: [],
  };
}
