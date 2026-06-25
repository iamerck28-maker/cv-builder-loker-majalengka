'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/lib/store';
import { Education, generateId } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { SortableList, arrayMove } from './SortableList';
import { SortableItem } from './SortableItem';

export function EducationForm() {
  const { data, updateData } = useCVStore();
  const locale = useLocale();
  const t = locale.form.education;

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      institution: '',
      major: '',
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      gpa: '',
    };
    updateData({ education: [...data.education, newEdu] });
  };

  const removeEducation = (index: number) => {
    updateData({ education: data.education.filter((_, i) => i !== index) });
  };

  const updateEducation = (index: number, field: keyof Education, value: string | number) => {
    const updated = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    updateData({ education: updated });
  };

  const handleReorder = (from: number, to: number) => {
    updateData({ education: arrayMove(data.education, from, to) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>

      <SortableList items={data.education} onReorder={handleReorder}>
        {data.education.map((edu, index) => (
          <SortableItem key={edu.id} id={edu.id}>
            <div className="p-3 sm:p-4 border rounded-lg space-y-3 mb-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{t.entry} {index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeEducation(index)} className="text-destructive hover:text-destructive/90 h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">{t.institution}</Label>
                  <Input value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} placeholder={t.institution} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.major}</Label>
                  <Input value={edu.major} onChange={(e) => updateEducation(index, 'major', e.target.value)} placeholder={t.major} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.startYear}</Label>
                  <Input type="number" value={edu.startYear} onChange={(e) => updateEducation(index, 'startYear', parseInt(e.target.value))} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.endYear}</Label>
                  <Input type="number" value={edu.endYear} onChange={(e) => updateEducation(index, 'endYear', parseInt(e.target.value))} className={edu.endYear < edu.startYear ? 'border-red-500' : ''} />
                  {edu.endYear < edu.startYear && <p className="text-xs text-red-500">{t.yearError}</p>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.gpa}</Label>
                  <Input value={edu.gpa || ''} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} placeholder={t.gpa} />
                </div>
              </div>
            </div>
          </SortableItem>
        ))}
      </SortableList>

      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
