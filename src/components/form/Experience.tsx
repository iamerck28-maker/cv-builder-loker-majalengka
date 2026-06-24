'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCVStore } from '@/lib/store';
import { Experience } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import locales from '@/locales/id.json';

export function ExperienceForm() {
  const { data, updateData } = useCVStore();
  const t = locales.form.experience;

  const addExperience = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: [''],
    };
    updateData({
      experience: [...data.experience, newExperience],
    });
  };

  const removeExperience = (index: number) => {
    const updated = data.experience.filter((_, i) => i !== index);
    updateData({ experience: updated });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = data.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    updateData({ experience: updated });
  };

  const addDescriptionPoint = (expIndex: number) => {
    const updated = data.experience.map((exp, i) =>
      i === expIndex
        ? { ...exp, description: [...exp.description, ''] }
        : exp
    );
    updateData({ experience: updated });
  };

  const updateDescriptionPoint = (expIndex: number, pointIndex: number, value: string) => {
    const updated = data.experience.map((exp, i) =>
      i === expIndex
        ? {
            ...exp,
            description: exp.description.map((desc, j) =>
              j === pointIndex ? value : desc
            ),
          }
        : exp
    );
    updateData({ experience: updated });
  };

  const removeDescriptionPoint = (expIndex: number, pointIndex: number) => {
    const updated = data.experience.map((exp, i) =>
      i === expIndex
        ? {
            ...exp,
            description: exp.description.filter((_, j) => j !== pointIndex),
          }
        : exp
    );
    updateData({ experience: updated });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>
      
      {data.experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Pengalaman {index + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(index)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.company}</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                placeholder={t.company}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t.position}</Label>
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                placeholder={t.position}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t.startDate}</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t.endDate}</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>{t.description}</Label>
            {exp.description.map((desc, pointIndex) => (
              <div key={pointIndex} className="flex gap-2">
                <Textarea
                  value={desc}
                  onChange={(e) => updateDescriptionPoint(index, pointIndex, e.target.value)}
                  placeholder={`Poin ${pointIndex + 1}`}
                  className="flex-1"
                />
                {exp.description.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDescriptionPoint(index, pointIndex)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={() => addDescriptionPoint(index)}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t.addDescription}
            </Button>
          </div>
        </div>
      ))}
      
      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
