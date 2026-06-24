import { CVData } from '@/types/cv';

const STORAGE_KEY = 'cv-builder-data';

interface StorageData {
  data: CVData;
  template: 'ats' | 'creative';
  language: 'id' | 'en';
  colorScheme: string;
}

export function loadFromStorage(): StorageData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveToStorage(data: StorageData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}
