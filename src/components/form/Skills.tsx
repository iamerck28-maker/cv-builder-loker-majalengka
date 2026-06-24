'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCVStore } from '@/lib/store';
import { Skill } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import locales from '@/locales/id.json';

export function SkillsForm() {
  const { data, updateData } = useCVStore();
  const t = locales.form.skills;

  const addSkill = () => {
    const newSkill: Skill = {
      name: '',
      category: 'technical',
    };
    updateData({
      skills: [...data.skills, newSkill],
    });
  };

  const removeSkill = (index: number) => {
    const updated = data.skills.filter((_, i) => i !== index);
    updateData({ skills: updated });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updated = data.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    updateData({ skills: updated });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>
      
      {data.skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
          <div className="flex-1">
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(index, 'name', e.target.value)}
              placeholder={t.name}
            />
          </div>
          
          <div className="flex-1">
            <select
              value={skill.category}
              onChange={(e) => updateSkill(index, 'category', e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="technical">{t.technical}</option>
              <option value="soft">{t.soft}</option>
            </select>
          </div>
          
          <Badge variant={skill.category === 'technical' ? 'default' : 'secondary'}>
            {skill.category === 'technical' ? t.technical : t.soft}
          </Badge>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeSkill(index)}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button onClick={addSkill} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.add}
      </Button>
    </div>
  );
}
