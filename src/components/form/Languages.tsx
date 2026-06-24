'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/lib/store';
import { Language } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';

export function LanguagesForm() {
  const { data, updateData } = useCVStore();
  const locale = useLocale();
  const t = locale.form.languages;

  const addLanguage = () => {
    const newLanguage: Language = {
      name: '',
      level: 'Menengah',
    };
    updateData({
      languages: [...data.languages, newLanguage],
    });
  };

  const removeLanguage = (index: number) => {
    const updated = data.languages.filter((_, i) => i !== index);
    updateData({ languages: updated });
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = data.languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    updateData({ languages: updated });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>
      
      {data.languages.map((lang, index) => (
        <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
          <div className="flex-1">
            <Input
              value={lang.name}
              onChange={(e) => updateLanguage(index, 'name', e.target.value)}
              placeholder={t.name}
            />
          </div>
          
          <div className="flex-1">
            <select
              value={lang.level}
              onChange={(e) => updateLanguage(index, 'level', e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="Pemula">{t.pemula}</option>
              <option value="Menengah">{t.menengah}</option>
              <option value="Mahir">{t.mahir}</option>
              <option value="Native">{t.native}</option>
            </select>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeLanguage(index)}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button onClick={addLanguage} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
