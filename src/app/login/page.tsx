'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = locale.login;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) newErrors.name = t.nameRequired;
    if (!email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = t.emailInvalid;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem('cv-user', JSON.stringify({ name: name.trim(), email: email.trim() }));
    router.push('/builder');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-name">{t.name}</Label>
              <Input
                id="login-name"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                placeholder={t.namePlaceholder}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-email">{t.email}</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                placeholder={t.emailPlaceholder}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <Button type="submit" className="w-full">
              {t.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
