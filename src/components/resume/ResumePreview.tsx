"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { motion } from "framer-motion";
import { templates } from "@/components/forms/TemplateSelector";
import { User, Mail, Phone, MapPin, Globe } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.91-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

export function ResumePreview() {
    const { data } = useResumeStore();
    const { personalInfo, education, experience, projects, skills, settings } = data;

    const techSkills = skills.filter((s) => s.category === "technical").map(s => s.name);
    const softSkills = skills.filter((s) => s.category === "soft").map(s => s.name);

    const selectedTemplate = templates.find(t => t.id === settings.templateId) || templates[0];
    const layout = selectedTemplate.layout;

    const isClassic = layout === "classic";
    const isSplit = layout === "split-header";
    const isLeft = layout === "left-align";

    const fontFamily = isClassic ? "Times New Roman, serif" : "Helvetica, sans-serif";
    const headerBorder = isClassic ? "border-b-2 border-black mb-4 pb-3" : isSplit ? "border-b border-gray-300 mb-4 pb-3" : "border-b-4 border-gray-800 mb-4 pb-3";
    
    // Strict ATS styles
    const headingStyle = `uppercase font-bold text-[14px] mb-2 ${isClassic ? "border-b border-gray-300" : "border-b-2 border-gray-800"}`;
    const bodySize = "text-[12px] leading-relaxed";
    const subtext = "text-[10px] text-gray-600";

    const name = personalInfo.fullName || "SAYANDH SR";
    const email = personalInfo.email || "sayandh@example.com";
    const phone = personalInfo.phone || "+1 234 567 890";
    const location = personalInfo.location || "San Francisco, CA";
    const linkedin = personalInfo.linkedin || "linkedin.com/in/sayandhsr";
    const github = personalInfo.github || "github.com/sayandh";

    return (
        <div id="resume-preview" className="w-full aspect-[1/1.414] bg-white text-black overflow-hidden shadow-xl print:shadow-none print:border-none relative rounded-md mx-auto">
            <motion.div 
              key={settings.templateId + JSON.stringify(data.personalInfo)}
              initial={{ opacity: 0.9, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-10 h-full flex flex-col" 
              style={{ fontFamily, color: "#000000" }}
            >

                {/* Header Section */}
                {isClassic && (
                    <div className={`text-center ${headerBorder}`}>
                        <h1 className="text-3xl font-bold uppercase tracking-widest">{name}</h1>
                        <div className="flex flex-wrap justify-center gap-x-3 mt-2 text-[11px] text-gray-700">
                            <span>{email}</span>
                            <span>| {phone}</span>
                            {location && <span>| {location}</span>}
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-3 mt-1 text-[11px] text-gray-700">
                            <span>{linkedin}</span>
                            <span>| {github}</span>
                            {personalInfo.portfolio && <span>| {personalInfo.portfolio}</span>}
                        </div>
                    </div>
                )}

                {isLeft && (
                    <div className={`text-left ${headerBorder}`}>
                        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900">{name}</h1>
                        <div className="flex flex-wrap justify-start gap-x-4 mt-2 text-[12px] font-medium text-gray-600">
                            <span>{email}</span>
                            <span>{phone}</span>
                            {location && <span>{location}</span>}
                        </div>
                        <div className="flex flex-wrap justify-start gap-x-4 mt-1 text-[12px] font-medium text-gray-600">
                            <span>{linkedin}</span>
                            <span>{github}</span>
                            {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                        </div>
                    </div>
                )}

                {isSplit && (
                    <div className={`flex justify-between items-end ${headerBorder}`}>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tighter">{name}</h1>
                            <p className="text-[14px] text-gray-600 font-medium mt-1">{settings.jobRole || "Software Engineer"}</p>
                        </div>
                        <div className="text-right text-[11px] text-gray-600 space-y-0.5">
                            <p>{email} | {phone}</p>
                            <p>{linkedin}</p>
                            <p>{github}</p>
                            {location && <p>{location}</p>}
                        </div>
                    </div>
                )}

                {/* Experience Section */}
                {experience.length > 0 && (
                    <div className="mb-5 text-[#000000]">
                        <h2 className={headingStyle}>Experience</h2>
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className={`flex justify-between items-baseline font-bold ${bodySize}`}>
                                        <span className="text-[13px]">{exp.role}</span>
                                        <span className={subtext}>{exp.duration}</span>
                                    </div>
                                    <div className={`${bodySize} font-bold italic text-gray-800`}>{exp.company}</div>
                                    <p className={`${bodySize} whitespace-pre-wrap mt-1 text-gray-800`}>
                                      {exp.description.split('\n').map((line, i) => (
                                        <span key={i} className="block">{line.startsWith('-') || line.startsWith('•') ? line : `• ${line}`}</span>
                                      ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education Section */}
                {education.length > 0 && (
                    <div className="mb-5 text-[#000000]">
                        <h2 className={headingStyle}>Education</h2>
                        <div className="space-y-3">
                            {education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-baseline">
                                    <div>
                                        <div className={`font-bold ${bodySize}`}>{edu.degree}</div>
                                        <div className={`${bodySize} text-gray-800`}>{edu.university} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
                                    </div>
                                    <div className={subtext}>{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Section */}
                {projects.length > 0 && (
                    <div className="mb-5 text-[#000000]">
                        <h2 className={headingStyle}>Projects</h2>
                        <div className="space-y-4">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <div className={`flex justify-between items-baseline font-bold ${bodySize}`}>
                                        <span className="text-[13px]">{proj.title}</span>
                                        {proj.github && (
                                            <span className={`${subtext} text-blue-600`}>{proj.github}</span>
                                        )}
                                    </div>
                                    {proj.technologies && (
                                        <div className={`italic ${bodySize} text-gray-700`}>
                                            {proj.technologies}
                                        </div>
                                    )}
                                    <p className={`${bodySize} whitespace-pre-wrap mt-1 text-gray-800`}>
                                      {proj.description.split('\n').map((line, i) => (
                                        <span key={i} className="block">{line.startsWith('-') || line.startsWith('•') ? line : `• ${line}`}</span>
                                      ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                    <div className="mb-4 mt-auto text-[#000000]">
                        <h2 className={headingStyle}>Skills</h2>
                        <div className="space-y-1">
                            {techSkills.length > 0 && (
                                <div className={bodySize}>
                                    <span className="font-bold">Languages & Frameworks: </span>
                                    <span className="text-gray-800">{techSkills.join(", ")}</span>
                                </div>
                            )}
                            {softSkills.length > 0 && (
                                <div className={bodySize}>
                                    <span className="font-bold">Tools & Methodologies: </span>
                                    <span className="text-gray-800">{softSkills.join(", ")}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </motion.div>
        </div>
    );
}
