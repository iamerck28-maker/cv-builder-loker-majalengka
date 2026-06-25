export interface CVData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    linkedin?: string;
    photo?: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
}

export interface Education {
  id: string;
  institution: string;
  major: string;
  startYear: number;
  endYear: number;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft';
}

export interface Language {
  id: string;
  name: string;
  level: 'Pemula' | 'Menengah' | 'Mahir' | 'Native';
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function ensureIds<T extends { id?: string }>(items: T[]): (T & { id: string })[] {
  return items.map(item => item.id ? item as T & { id: string } : { ...item, id: generateId() });
}
