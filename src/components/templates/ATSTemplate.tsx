'use client';

import { CVData } from '@/types/cv';

interface ATSTemplateProps {
  data: CVData;
  colorScheme: string;
}

export function ATSTemplate({ data, colorScheme }: ATSTemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return 'Present';
    const [year, month] = date.split('-');
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div id="cv-preview" className="w-[210mm] min-h-[297mm] bg-white p-8 text-sm">
      {/* Header */}
      <div className="text-center mb-6">
        {data.personal.photo && (
          <img
            src={data.personal.photo}
            alt="Photo"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold" style={{ color: colorScheme }}>
          {data.personal.fullName || 'Nama Anda'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.city && <span>{data.personal.city}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2" style={{ color: colorScheme }}>
            Ringkasan
          </h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2" style={{ color: colorScheme }}>
            Pendidikan
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <span className="font-medium">{edu.institution}</span>
                <span className="text-gray-500">
                  {edu.startYear} - {edu.endYear}
                </span>
              </div>
              <div className="text-gray-600">{edu.major}</div>
              {edu.gpa && <div className="text-gray-500 text-xs">IPK: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2" style={{ color: colorScheme }}>
            Pengalaman Kerja
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <span className="font-medium">{exp.position}</span>
                <span className="text-gray-500">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
              <div className="text-gray-600 italic">{exp.company}</div>
              {exp.description.length > 0 && (
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2" style={{ color: colorScheme }}>
            Keahlian
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colorScheme}15`,
                  color: colorScheme,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2" style={{ color: colorScheme }}>
            Bahasa
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span>{lang.name}</span>
                <span className="text-gray-500">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
