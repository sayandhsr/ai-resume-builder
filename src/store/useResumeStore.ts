import { create } from 'zustand';

export type JobType = 'Internship' | 'Part-time' | 'Full-time';
export type ResumeTone = 'Clean' | 'Professional' | 'ATS-optimized';

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
    location: string;
}

export interface Education {
    id: string;
    degree: string;
    university: string;
    year: string;
    gpa: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string;
    github: string;
}

export interface Skill {
    id: string;
    name: string;
    category: 'technical' | 'soft';
}

export interface Certification {
    id: string;
    title: string;
    organization: string;
    year: string;
}

export type AIModel = 'google/gemini-flash-1.5:free' | 'meta-llama/llama-3.1-8b-instruct:free' | 'mistralai/mistral-7b-instruct:free';
export type OptimizationType = 'ATS Rewrite' | 'Grammar & spelling' | 'Keyword optimization' | 'ATS Score Booster';

export interface ResumeSettings {
    jobRole: string;
    jobType: JobType | '';
    tone: ResumeTone;
    pageCount: '1' | '2';
    aiModel: AIModel;
    optimizationType: OptimizationType;
    templateId: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    skills: Skill[];
    certifications: Certification[];
    settings: ResumeSettings;
}

interface ResumeStore {
    data: ResumeData;
    updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
    // Generic collection updaters
    addEducation: (edu: Education) => void;
    updateEducation: (id: string, edu: Partial<Education>) => void;
    removeEducation: (id: string) => void;

    addExperience: (exp: Experience) => void;
    updateExperience: (id: string, exp: Partial<Experience>) => void;
    removeExperience: (id: string) => void;

    addProject: (proj: Project) => void;
    updateProject: (id: string, proj: Partial<Project>) => void;
    removeProject: (id: string) => void;

    addSkill: (skill: Skill) => void;
    removeSkill: (id: string) => void;

    addCertification: (cert: Certification) => void;
    updateCertification: (id: string, cert: Partial<Certification>) => void;
    removeCertification: (id: string) => void;

    updateSettings: (settings: Partial<ResumeSettings>) => void;
    setResumeData: (data: ResumeData, id?: string | null) => void;
    resetResumeData: () => void;
    currentResumeId: string | null;
}

const initialData: ResumeData = {
    personalInfo: { fullName: '', email: '', phone: '', linkedin: '', github: '', portfolio: '', location: '' },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    settings: { 
        jobRole: '', 
        jobType: '', 
        tone: 'ATS-optimized', 
        pageCount: '1',
        aiModel: 'google/gemini-flash-1.5:free',
        optimizationType: 'ATS Rewrite',
        templateId: 'classic-ats'
    },
};

export const useResumeStore = create<ResumeStore>((set) => ({
    data: initialData,
    updatePersonalInfo: (info) => set((state) => ({ data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } } })),

    addEducation: (edu) => set((state) => ({ data: { ...state.data, education: [...state.data.education, edu] } })),
    updateEducation: (id, edu) => set((state) => ({ data: { ...state.data, education: state.data.education.map(e => e.id === id ? { ...e, ...edu } : e) } })),
    removeEducation: (id) => set((state) => ({ data: { ...state.data, education: state.data.education.filter(e => e.id !== id) } })),

    addExperience: (exp) => set((state) => ({ data: { ...state.data, experience: [...state.data.experience, exp] } })),
    updateExperience: (id, exp) => set((state) => ({ data: { ...state.data, experience: state.data.experience.map(e => e.id === id ? { ...e, ...exp } : e) } })),
    removeExperience: (id) => set((state) => ({ data: { ...state.data, experience: state.data.experience.filter(e => e.id !== id) } })),

    addProject: (proj) => set((state) => ({ data: { ...state.data, projects: [...state.data.projects, proj] } })),
    updateProject: (id, proj) => set((state) => ({ data: { ...state.data, projects: state.data.projects.map(p => p.id === id ? { ...p, ...proj } : p) } })),
    removeProject: (id) => set((state) => ({ data: { ...state.data, projects: state.data.projects.filter(p => p.id !== id) } })),

    addSkill: (skill) => set((state) => ({ data: { ...state.data, skills: [...state.data.skills, skill] } })),
    removeSkill: (id) => set((state) => ({ data: { ...state.data, skills: state.data.skills.filter(s => s.id !== id) } })),

    addCertification: (cert) => set((state) => ({ data: { ...state.data, certifications: [...state.data.certifications, cert] } })),
    updateCertification: (id, cert) => set((state) => ({ data: { ...state.data, certifications: state.data.certifications.map(c => c.id === id ? { ...c, ...cert } : c) } })),
    removeCertification: (id) => set((state) => ({ data: { ...state.data, certifications: state.data.certifications.filter(c => c.id !== id) } })),

    updateSettings: (settings) => set((state) => ({ data: { ...state.data, settings: { ...state.data.settings, ...settings } } })),
    
    setResumeData: (data, id = null) => set({ data, currentResumeId: id }),
    resetResumeData: () => set({ data: initialData, currentResumeId: null }),
    currentResumeId: null,
}));
