'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCVStore } from '@/lib/store';
import { Skill, generateId } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { SortableList, arrayMove } from './SortableList';
import { SortableItem } from './SortableItem';

export function SkillsForm() {
  const { data, updateData } = useCVStore();
  const locale = useLocale();
  const t = locale.form.skills;

  const addSkill = () => {
    const newSkill: Skill = { id: generateId(), name: '', category: 'technical' };
    updateData({ skills: [...data.skills, newSkill] });
  };

  const removeSkill = (index: number) => {
    updateData({ skills: data.skills.filter((_, i) => i !== index) });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updated = data.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    updateData({ skills: updated });
  };

  const handleReorder = (from: number, to: number) => {
    updateData({ skills: arrayMove(data.skills, from, to) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>

      <SortableList items={data.skills} onReorder={handleReorder}>
        {data.skills.map((skill, index) => (
          <SortableItem key={skill.id} id={skill.id}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 border rounded-lg mb-2">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                placeholder={t.name}
                className="flex-1 w-full sm:w-auto"
              />
              <select
                value={skill.category}
                onChange={(e) => updateSkill(index, 'category', e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="technical">{t.technical}</option>
                <option value="soft">{t.soft}</option>
              </select>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <Badge variant={skill.category === 'technical' ? 'default' : 'secondary'}>
                  {skill.category === 'technical' ? t.technical : t.soft}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => removeSkill(index)} className="text-destructive hover:text-destructive/90 h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SortableItem>
        ))}
      </SortableList>

      <Button onClick={addSkill} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
