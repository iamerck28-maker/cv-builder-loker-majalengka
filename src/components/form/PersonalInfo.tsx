'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCVStore } from '@/lib/store';
import { useLocale } from '@/hooks/useLocale';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        const maxDim = 400;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PersonalInfo() {
  const { data, updateData } = useCVStore();
  const locale = useLocale();
  const t = locale.form.personal;
  const [photoError, setPhotoError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleChange = (field: string, value: string) => {
    if (field === 'fullName' && !value.trim()) {
      setNameError(t.nameRequired);
    } else if (field === 'fullName') {
      setNameError('');
    }
    updateData({ personal: { ...data.personal, [field]: value } });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError('');
    if (file.size > MAX_FILE_SIZE) {
      setPhotoError(t.photoTooBig);
      return;
    }
    try {
      const compressed = await compressImage(file);
      updateData({ personal: { ...data.personal, photo: compressed } });
    } catch {
      setPhotoError('Failed to process image');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            id="fullName"
            value={data.personal.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => { if (!data.personal.fullName.trim()) setNameError(t.nameRequired); }}
            placeholder={t.fullName}
            className={nameError ? 'border-red-500' : ''}
          />
          {nameError && <p className="text-sm text-red-500">{nameError}</p>}
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
            className="file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          {photoError && <p className="text-sm text-red-500">{photoError}</p>}
        </div>
      </div>

      {data.personal.photo && (
        <div className="mt-4">
          <img
            src={data.personal.photo}
            alt="Preview"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-muted"
          />
        </div>
      )}
    </div>
  );
}
