'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/lib/store';
import { Language, generateId } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { SortableList, arrayMove } from './SortableList';
import { SortableItem } from './SortableItem';

export function LanguagesForm() {
  const { data, updateData } = useCVStore();
  const locale = useLocale();
  const t = locale.form.languages;

  const addLanguage = () => {
    const newLang: Language = { id: generateId(), name: '', level: 'Menengah' };
    updateData({ languages: [...data.languages, newLang] });
  };

  const removeLanguage = (index: number) => {
    updateData({ languages: data.languages.filter((_, i) => i !== index) });
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = data.languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    updateData({ languages: updated });
  };

  const handleReorder = (from: number, to: number) => {
    updateData({ languages: arrayMove(data.languages, from, to) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>

      <SortableList items={data.languages} onReorder={handleReorder}>
        {data.languages.map((lang, index) => (
          <SortableItem key={lang.id} id={lang.id}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 border rounded-lg mb-2">
              <Input
                value={lang.name}
                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                placeholder={t.name}
                className="flex-1 w-full sm:w-auto"
              />
              <select
                value={lang.level}
                onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="Pemula">{t.pemula}</option>
                <option value="Menengah">{t.menengah}</option>
                <option value="Mahir">{t.mahir}</option>
                <option value="Native">{t.native}</option>
              </select>
              <Button variant="ghost" size="icon" onClick={() => removeLanguage(index)} className="text-destructive hover:text-destructive/90 h-8 w-8 self-end sm:self-auto">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </SortableItem>
        ))}
      </SortableList>

      <Button onClick={addLanguage} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
