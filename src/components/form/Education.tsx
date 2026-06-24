'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/lib/store';
import { Education } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';

export function EducationForm() {
  const { data, updateData } = useCVStore();
  const locale = useLocale();
  const t = locale.form.education;

  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      major: '',
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      gpa: '',
    };
    updateData({
      education: [...data.education, newEducation],
    });
  };

  const removeEducation = (index: number) => {
    const updated = data.education.filter((_, i) => i !== index);
    updateData({ education: updated });
  };

  const updateEducation = (index: number, field: keyof Education, value: string | number) => {
    const updated = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    updateData({ education: updated });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>
      
      {data.education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{t.entry} {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(index)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.institution}</Label>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                placeholder={t.institution}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t.major}</Label>
              <Input
                value={edu.major}
                onChange={(e) => updateEducation(index, 'major', e.target.value)}
                placeholder={t.major}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t.startYear}</Label>
              <Input
                type="number"
                value={edu.startYear}
                onChange={(e) => updateEducation(index, 'startYear', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t.endYear}</Label>
              <Input
                type="number"
                value={edu.endYear}
                onChange={(e) => updateEducation(index, 'endYear', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t.gpa}</Label>
              <Input
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                placeholder={t.gpa}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
