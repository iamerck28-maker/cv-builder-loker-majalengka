'use client';

import { CVData } from '@/types/cv';

interface MinimalistTemplateProps {
  data: CVData;
  colorScheme: string;
  locale: {
    template: {
      sections: { summary: string; education: string; experience: string; skills: string; languages: string };
      gpa: string;
      present: string;
      namePlaceholder: string;
    };
    form: {
      languages: { pemula: string; menengah: string; mahir: string; native: string };
    };
  };
}

const levelMap = { Pemula: 'pemula', Menengah: 'menengah', Mahir: 'mahir', Native: 'native' } as const;

export function MinimalistTemplate({ data, colorScheme, locale }: MinimalistTemplateProps) {
  const t = locale.template;

  const formatDate = (date: string) => {
    if (!date) return t.present;
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const translateLevel = (level: string) => {
    const key = levelMap[level as keyof typeof levelMap];
    return key ? locale.form.languages[key] : level;
  };

  return (
    <div id="cv-preview" className="w-[210mm] min-h-[297mm] bg-white p-10 text-sm font-light" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal tracking-wide mb-1" style={{ color: colorScheme }}>
          {data.personal.fullName || t.namePlaceholder}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.city && <span>{data.personal.city}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
        <div className="mt-3 h-px w-full" style={{ backgroundColor: colorScheme, opacity: 0.3 }} />
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed text-sm">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: colorScheme }}>
            {t.sections.experience}
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-medium text-sm text-gray-900">{exp.position}</span>
                  {exp.company && <span className="text-gray-500 text-sm"> — {exp.company}</span>}
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-4">
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </span>
              </div>
              {exp.description.filter(Boolean).length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.description.filter(Boolean).map((desc, i) => (
                    <li key={i} className="text-gray-600 text-sm pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-300">
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: colorScheme }}>
            {t.sections.education}
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3 flex justify-between items-baseline">
              <div>
                <span className="font-medium text-sm text-gray-900">{edu.institution}</span>
                <span className="text-gray-500 text-sm"> — {edu.major}</span>
                {edu.gpa && <span className="text-gray-400 text-xs ml-2">({t.gpa}: {edu.gpa})</span>}
              </div>
              <span className="text-xs text-gray-400 shrink-0 ml-4">{edu.startYear} – {edu.endYear}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: colorScheme }}>
            {t.sections.skills}
          </h2>
          <p className="text-sm text-gray-600">
            {data.skills.map(s => s.name).join('  ·  ')}
          </p>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: colorScheme }}>
            {t.sections.languages}
          </h2>
          <p className="text-sm text-gray-600">
            {data.languages.map(l => `${l.name} (${translateLevel(l.level)})`).join('  ·  ')}
          </p>
        </div>
      )}
    </div>
  );
}
