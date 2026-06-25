'use client';

import { useCVStore } from '@/lib/store';
import { useLocale } from '@/hooks/useLocale';

export function CompletenessScore() {
  const data = useCVStore((s) => s.data);
  const locale = useLocale();
  const t = locale.completeness;

  const checks = [
    { key: 'name', done: !!data.personal.fullName.trim(), label: t.name },
    { key: 'email', done: !!data.personal.email.trim(), label: t.email },
    { key: 'phone', done: !!data.personal.phone.trim(), label: t.phone },
    { key: 'city', done: !!data.personal.city.trim(), label: t.city },
    { key: 'summary', done: data.summary.trim().length >= 20, label: t.summary },
    { key: 'education', done: data.education.length > 0, label: t.education },
    { key: 'experience', done: data.experience.length > 0, label: t.experience },
    { key: 'skills', done: data.skills.length >= 3, label: t.skills },
  ];

  const completed = checks.filter((c) => c.done).length;
  const total = checks.length;
  const pct = Math.round((completed / total) * 100);
  const missing = checks.filter((c) => !c.done);

  const barColor =
    pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{t.title}</span>
        <span className="text-sm font-bold" style={{ color: pct >= 80 ? '#16a34a' : pct >= 50 ? '#eab308' : '#dc2626' }}>
          {pct}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {missing.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {t.missing}: {missing.map((m) => m.label).join(', ')}
        </div>
      )}
    </div>
  );
}
