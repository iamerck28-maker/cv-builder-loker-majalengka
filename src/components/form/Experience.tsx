'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCVStore } from '@/lib/store';
import { Experience, generateId } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { SortableList, arrayMove } from './SortableList';
import { SortableItem } from './SortableItem';

export function ExperienceForm() {
  const { data, updateData } = useCVStore();
  const locale = useLocale();
  const t = locale.form.experience;

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: [''],
    };
    updateData({ experience: [...data.experience, newExp] });
  };

  const removeExperience = (index: number) => {
    updateData({ experience: data.experience.filter((_, i) => i !== index) });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = data.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    updateData({ experience: updated });
  };

  const addDescriptionPoint = (expIndex: number) => {
    const updated = data.experience.map((exp, i) =>
      i === expIndex ? { ...exp, description: [...exp.description, ''] } : exp
    );
    updateData({ experience: updated });
  };

  const updateDescriptionPoint = (expIndex: number, pointIndex: number, value: string) => {
    const updated = data.experience.map((exp, i) =>
      i === expIndex
        ? { ...exp, description: exp.description.map((d, j) => j === pointIndex ? value : d) }
        : exp
    );
    updateData({ experience: updated });
  };

  const removeDescriptionPoint = (expIndex: number, pointIndex: number) => {
    const updated = data.experience.map((exp, i) =>
      i === expIndex
        ? { ...exp, description: exp.description.filter((_, j) => j !== pointIndex) }
        : exp
    );
    updateData({ experience: updated });
  };

  const handleReorder = (from: number, to: number) => {
    updateData({ experience: arrayMove(data.experience, from, to) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>

      <SortableList items={data.experience} onReorder={handleReorder}>
        {data.experience.map((exp, index) => (
          <SortableItem key={exp.id} id={exp.id}>
            <div className="p-3 sm:p-4 border rounded-lg space-y-3 mb-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{t.entry} {index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeExperience(index)} className="text-destructive hover:text-destructive/90 h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">{t.company}</Label>
                  <Input value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} placeholder={t.company} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.position}</Label>
                  <Input value={exp.position} onChange={(e) => updateExperience(index, 'position', e.target.value)} placeholder={t.position} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.startDate}</Label>
                  <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t.endDate}</Label>
                  <Input type="month" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">{t.description}</Label>
                {exp.description.map((desc, pointIndex) => (
                  <div key={pointIndex} className="flex gap-2">
                    <Textarea
                      value={desc}
                      onChange={(e) => updateDescriptionPoint(index, pointIndex, e.target.value)}
                      placeholder={`${t.pointPlaceholder} ${pointIndex + 1}`}
                      className="flex-1 min-h-[60px]"
                    />
                    {exp.description.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => removeDescriptionPoint(index, pointIndex)} className="text-destructive hover:text-destructive/90 h-8 w-8 shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={() => addDescriptionPoint(index)} variant="ghost" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addDescription}
                </Button>
              </div>
            </div>
          </SortableItem>
        ))}
      </SortableList>

      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
