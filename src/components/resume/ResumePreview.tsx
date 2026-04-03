"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { motion } from "framer-motion";

const getTemplateStyles = (id: string) => {
    // strict ATS compliance defaults
    const base = {
        fontFamily: "Arial, sans-serif",
        nameAlign: "text-center",
        headingStyle: "uppercase border-b border-black pb-1 mb-2 font-bold tracking-widest text-[#000000]",
        itemSpacing: "space-y-3",
        nameSize: "text-[24px]",
        headingSize: "text-[16px]",
        bodySize: "text-[12px] leading-relaxed",
        subtext: "text-[12px] text-gray-600"
    };

    if (id === "minimal-ats" || id === "clean-ats") {
        return { ...base, nameAlign: "text-left", headingStyle: "font-bold mb-1 text-[#000000]", itemSpacing: "space-y-2" };
    }
    if (id === "professional-ats" || id === "executive-ats") {
        return { ...base, fontFamily: "Helvetica, sans-serif", headingStyle: "uppercase border-b-2 border-[#000000] pb-1 mb-3 font-bold text-[#000000]" };
    }
    if (id === "modern-ats" || id === "elegant-ats") {
        return { ...base, fontFamily: "Inter, sans-serif", nameAlign: "text-left", headingStyle: "uppercase border-b border-gray-300 pb-1 mb-2 font-bold text-[#000000]" };
    }
    if (id === "compact-ats" || id === "structured-ats") {
        return { ...base, itemSpacing: "space-y-1.5", bodySize: "text-[11px] leading-tight" };
    }
    
    // Tech roles lean modern/left-aligned
    if (["data-scientist", "ml-engineer", "ai-engineer", "software-engineer", "fullstack-developer", "backend-developer", "frontend-developer", "web-developer", "devops-engineer", "cloud-engineer", "mobile-developer"].includes(id)) {
        return { ...base, fontFamily: "Helvetica, sans-serif", nameAlign: "text-left", headingStyle: "uppercase border-b border-black pb-1 mb-2 font-bold text-[#000000]" };
    }

    // Design/Business roles
    if (["ui-ux-designer", "product-manager", "business-analyst", "cybersecurity"].includes(id)) {
        return { ...base, fontFamily: "Inter, sans-serif" };
    }
    
    return base;
};

export function ResumePreview() {
    const { data } = useResumeStore();
    const { personalInfo, education, experience, projects, skills, settings } = data;

    const techSkills = skills.filter((s) => s.category === "technical").map(s => s.name);
    const softSkills = skills.filter((s) => s.category === "soft").map(s => s.name);

    // Apply strict ATS template logic
    const styles = getTemplateStyles(settings.templateId || "classic-ats");

    return (
        <div id="resume-preview" className="w-full aspect-[1/1.414] bg-white text-black overflow-hidden shadow-xl print:shadow-none print:border-none relative">
            <motion.div 
              key={settings.templateId + JSON.stringify(data.personalInfo)}
              initial={{ opacity: 0.9, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8 h-full flex flex-col" 
              style={{ fontFamily: styles.fontFamily, color: "#000000" }}
            >

                {/* Header Section */}
                <div className={`${styles.nameAlign} mb-4`}>
                    <h1 className={`${styles.nameSize} font-bold text-[#000000]`}>
                        {personalInfo.fullName || "JOHN DOE"}
                    </h1>
                    <div className={`flex flex-wrap ${styles.nameAlign === 'text-center' ? 'justify-center' : 'justify-start'} gap-x-3 mt-1 ${styles.bodySize}`}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                        {personalInfo.location && <span>| {personalInfo.location}</span>}
                    </div>
                    <div className={`flex flex-wrap ${styles.nameAlign === 'text-center' ? 'justify-center' : 'justify-start'} gap-x-3 mt-1 ${styles.bodySize}`}>
                        {personalInfo.linkedin && (
                            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer">
                                {personalInfo.linkedin}
                            </a>
                        )}
                        {personalInfo.github && (
                            <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer">
                                {personalInfo.linkedin ? '| ' : ''}{personalInfo.github}
                            </a>
                        )}
                        {personalInfo.portfolio && (
                            <a href={`https://${personalInfo.portfolio}`} target="_blank" rel="noreferrer">
                                {(personalInfo.linkedin || personalInfo.github) ? '| ' : ''}{personalInfo.portfolio}
                            </a>
                        )}
                    </div>
                </div>

                {/* Experience Section */}
                {experience.length > 0 && (
                    <div className="mb-4 text-[#000000]">
                        <h2 className={`${styles.headingSize} ${styles.headingStyle}`}>Experience</h2>
                        <div className={styles.itemSpacing}>
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className={`flex justify-between items-baseline font-bold ${styles.bodySize}`}>
                                        <span>{exp.role}</span>
                                        <span className="font-normal">{exp.duration}</span>
                                    </div>
                                    <div className={`${styles.bodySize} font-bold italic`}>{exp.company}</div>
                                    <p className={`${styles.bodySize} whitespace-pre-wrap mt-1`}>
                                      {/* Parse bullet points safely within ATS plain text rules */}
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
                    <div className="mb-4 text-[#000000]">
                        <h2 className={`${styles.headingSize} ${styles.headingStyle}`}>Education</h2>
                        <div className={styles.itemSpacing}>
                            {education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-baseline">
                                    <div>
                                        <div className={`font-bold ${styles.bodySize}`}>{edu.degree}</div>
                                        <div className={styles.bodySize}>{edu.university} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
                                    </div>
                                    <div className={styles.bodySize}>{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Section */}
                {projects.length > 0 && (
                    <div className="mb-4 text-[#000000]">
                        <h2 className={`${styles.headingSize} ${styles.headingStyle}`}>Projects</h2>
                        <div className={styles.itemSpacing}>
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <div className={`flex justify-between items-baseline font-bold ${styles.bodySize}`}>
                                        <span>{proj.title}</span>
                                        {proj.github && (
                                            <span className="font-normal">{proj.github}</span>
                                        )}
                                    </div>
                                    {proj.technologies && (
                                        <div className={`italic ${styles.bodySize}`}>
                                            Technologies: {proj.technologies}
                                        </div>
                                    )}
                                    <p className={`${styles.bodySize} whitespace-pre-wrap mt-1`}>
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
                        <h2 className={`${styles.headingSize} ${styles.headingStyle}`}>Skills</h2>
                        {techSkills.length > 0 && (
                            <div className={`${styles.bodySize} mb-1`}>
                                <span className="font-bold">Technical: </span>
                                {techSkills.join(", ")}
                            </div>
                        )}
                        {softSkills.length > 0 && (
                            <div className={styles.bodySize}>
                                <span className="font-bold">Soft Skills: </span>
                                {softSkills.join(", ")}
                            </div>
                        )}
                    </div>
                )}

            </motion.div>
        </div>
    );
}
