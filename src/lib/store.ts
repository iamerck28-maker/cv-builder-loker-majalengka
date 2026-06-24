import { create } from 'zustand';
import { CVData } from '@/types/cv';
import { loadFromStorage, saveToStorage } from './localStorage';

const defaultData: CVData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedin: '',
    photo: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  languages: [],
};

interface CVStore {
  data: CVData;
  template: 'ats' | 'creative';
  language: 'id' | 'en';
  colorScheme: string;
  updateData: (data: Partial<CVData>) => void;
  setTemplate: (template: 'ats' | 'creative') => void;
  setLanguage: (language: 'id' | 'en') => void;
  setColorScheme: (color: string) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

export const useCVStore = create<CVStore>((set) => ({
  data: defaultData,
  template: 'ats',
  language: 'id',
  colorScheme: '#1e40af',
  updateData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  setTemplate: (template) => set({ template }),
  setLanguage: (language) => set({ language }),
  setColorScheme: (color) => set({ colorScheme: color }),
  loadFromStorage: () => {
    const saved = loadFromStorage();
    if (saved) {
      set({
        data: saved.data || defaultData,
        template: saved.template || 'ats',
        language: saved.language || 'id',
        colorScheme: saved.colorScheme || '#1e40af',
      });
    }
  },
  saveToStorage: () => {
    const state = useCVStore.getState();
    saveToStorage({
      data: state.data,
      template: state.template,
      language: state.language,
      colorScheme: state.colorScheme,
    });
  },
}));
