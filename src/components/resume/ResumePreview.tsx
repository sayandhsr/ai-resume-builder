"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { motion } from "framer-motion";
import { templates } from "@/components/forms/TemplateSelector";
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

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
