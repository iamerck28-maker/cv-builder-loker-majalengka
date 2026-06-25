'use client';

import { CVData } from '@/types/cv';

interface CreativeTemplateProps {
  data: CVData;
  colorScheme: string;
  locale: {
    template: {
      sections: { summary: string; education: string; experience: string; skills: string; languages: string; contact: string };
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

export function CreativeTemplate({ data, colorScheme, locale }: CreativeTemplateProps) {
  const t = locale.template;

  const formatDate = (date: string) => {
    if (!date) return t.present;
    const [year, month] = date.split('-');
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const translateLevel = (level: string) => {
    const key = levelMap[level as keyof typeof levelMap];
    return key ? locale.form.languages[key] : level;
  };

  return (
    <div id="cv-preview" className="w-[210mm] min-h-[297mm] bg-white flex">
      {/* Sidebar */}
      <div
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: colorScheme }}
      >
        {/* Photo */}
        {data.personal.photo && (
          <div className="mb-6">
            <img
              src={data.personal.photo}
              alt="Photo"
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/30"
            />
          </div>
        )}

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1">
            {t.sections.contact}
          </h3>
          <div className="space-y-2 text-sm">
            {data.personal.email && (
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>{data.personal.email}</span>
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal.city && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{data.personal.city}</span>
              </div>
            )}
            {data.personal.linkedin && (
              <div className="flex items-center gap-2">
                <span>💼</span>
                <a href={data.personal.linkedin.startsWith('http') ? data.personal.linkedin : `https://${data.personal.linkedin}`} className="underline break-all">{data.personal.linkedin}</a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1">
              {t.sections.skills}
            </h3>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  <span className="text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1">
              {t.sections.languages}
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{lang.name}</span>
                  <span className="text-white/70">{translateLevel(lang.level)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Name & Summary */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: colorScheme }}>
            {data.personal.fullName || t.namePlaceholder}
          </h1>
          {data.summary && (
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          )}
        </div>

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: colorScheme }}>
              {t.sections.education}
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3 pl-4 border-l-2" style={{ borderColor: colorScheme }}>
                <div className="flex justify-between">
                  <span className="font-medium">{edu.institution}</span>
                  <span className="text-gray-500 text-sm">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <div className="text-gray-600">{edu.major}</div>
                {edu.gpa && <div className="text-gray-500 text-xs">{t.gpa}: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: colorScheme }}>
              {t.sections.experience}
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 pl-4 border-l-2" style={{ borderColor: colorScheme }}>
                <div className="flex justify-between">
                  <span className="font-medium">{exp.position}</span>
                  <span className="text-gray-500 text-sm">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-gray-600 italic">{exp.company}</div>
                {exp.description.length > 0 && (
                  <ul className="mt-1 text-gray-700 text-sm">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: colorScheme }}>•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
