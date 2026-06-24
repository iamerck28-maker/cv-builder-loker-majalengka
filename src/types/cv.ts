// types/cv.ts
export interface CVData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    linkedin?: string;
    photo?: string; // base64
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
}

export interface Education {
  institution: string;
  major: string;
  startYear: number;
  endYear: number;
  gpa?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft';
}

export interface Language {
  name: string;
  level: 'Pemula' | 'Menengah' | 'Mahir' | 'Native';
}
