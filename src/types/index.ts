export interface Project {
  id: string;
  title: string;
  category: 'Hardware & IoT' | 'Analog Electronics' | 'Full-Stack & Cloud';
  badge: string;
  stack: string[];
  summary: string;
  highlights?: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  iconName: string;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  topic?: string;
  badge: string;
  certificateKey?: string;
  certificateImage?: string;
  summary: string;
}

export interface AcademicRecord {
  degree: string;
  institution: string;
  location: string;
  durationOrStatus: string;
  scores: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  details?: string[];
}

export interface InternshipRecord {
  role: string;
  organization: string;
  location: string;
  period: string;
  internId: string;
  status: string;
  recognitions: string[];
  remarks: string;
  certificateImage: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  periodOrDate: string;
  scoreOrDetails: string;
  credentialId: string;
  credentialLabel: string;
  certificateImage: string;
  breakdown?: {
    label: string;
    value: string;
  }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}
