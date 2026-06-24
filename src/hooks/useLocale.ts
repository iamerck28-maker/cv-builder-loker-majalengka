import { useCVStore } from '@/lib/store';
import idLocale from '@/locales/id.json';
import enLocale from '@/locales/en.json';

const locales = { id: idLocale, en: enLocale } as const;

export function useLocale() {
  const language = useCVStore((state) => state.language);
  return locales[language];
}
