'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCVStore } from '@/lib/store';
import locales from '@/locales/id.json';

export function PersonalInfo() {
  const { data, updateData } = useCVStore();
  const t = locales.form.personal;

  const handleChange = (field: string, value: string) => {
    updateData({
      personal: {
        ...data.personal,
        [field]: value,
      },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({
          personal: {
            ...data.personal,
            photo: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            id="fullName"
            value={data.personal.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder={t.fullName}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            type="email"
            value={data.personal.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={t.email}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            id="phone"
            type="tel"
            value={data.personal.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder={t.phone}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">{t.city}</Label>
          <Input
            id="city"
            value={data.personal.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t.city}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin">{t.linkedin}</Label>
          <Input
            id="linkedin"
            value={data.personal.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder={t.linkedin}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="photo">{t.photo}</Label>
          <Input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
      </div>
      
      {data.personal.photo && (
        <div className="mt-4">
          <img
            src={data.personal.photo}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
      )}
    </div>
  );
}
