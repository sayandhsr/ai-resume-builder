"use client";

import { useResumeStore } from "@/store/useResumeStore";

export function ResumePreview() {
    const { data } = useResumeStore();
    const { personalInfo, education, experience, projects, skills, certifications } = data;

    const techSkills = skills.filter((s) => s.category === "technical").map(s => s.name);
    const softSkills = skills.filter((s) => s.category === "soft").map(s => s.name);

    return (
        <div id="resume-preview" className="w-full aspect-[1/1.414] bg-white border border-border/50 shadow-xl overflow-hidden text-sm text-foreground print:shadow-none print:border-none">
            <div className="p-8 h-full flex flex-col">

                {/* Header Section */}
                <div className="text-center border-b pb-4 mb-4">
                    <h1 className="text-2xl font-bold uppercase tracking-wider text-primary">
                        {personalInfo.fullName || "John Doe"}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                        {personalInfo.location && <span>• {personalInfo.location}</span>}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-1 text-xs text-primary/80">
                        {personalInfo.linkedin && (
                            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer">
                                {personalInfo.linkedin}
                            </a>
                        )}
                        {personalInfo.github && (
                            <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer">
                                {personalInfo.linkedin ? '• ' : ''}{personalInfo.github}
                            </a>
                        )}
                        {personalInfo.portfolio && (
                            <a href={`https://${personalInfo.portfolio}`} target="_blank" rel="noreferrer">
                                {(personalInfo.linkedin || personalInfo.github) ? '• ' : ''}{personalInfo.portfolio}
                            </a>
                        )}
                    </div>
                </div>

                {/* Experience Section */}
                {experience.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b pb-1 mb-2">Experience</h2>
                        <div className="space-y-3">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline font-semibold">
                                        <span>{exp.role}</span>
                                        <span className="text-xs font-normal text-muted-foreground">{exp.duration}</span>
                                    </div>
                                    <div className="text-xs mb-1 italic text-muted-foreground">{exp.company}</div>
                                    <p className="text-xs whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education Section */}
                {education.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b pb-1 mb-2">Education</h2>
                        <div className="space-y-2">
                            {education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-baseline">
                                    <div>
                                        <div className="font-semibold">{edu.degree}</div>
                                        <div className="text-xs mb-1 text-muted-foreground">{edu.university} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Section */}
                {projects.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b pb-1 mb-2">Projects</h2>
                        <div className="space-y-3">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline font-semibold">
                                        <span>{proj.title}</span>
                                        {proj.github && (
                                            <span className="text-xs font-normal text-primary/80">{proj.github}</span>
                                        )}
                                    </div>
                                    {proj.technologies && (
                                        <div className="text-[10px] mb-1 font-medium text-muted-foreground">
                                            Technologies: {proj.technologies}
                                        </div>
                                    )}
                                    <p className="text-xs whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                    <div className="mb-4 mt-auto">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b pb-1 mb-2">Skills</h2>
                        {techSkills.length > 0 && (
                            <div className="text-xs mb-1">
                                <span className="font-semibold">Technical: </span>
                                {techSkills.join(", ")}
                            </div>
                        )}
                        {softSkills.length > 0 && (
                            <div className="text-xs">
                                <span className="font-semibold">Soft Skills: </span>
                                {softSkills.join(", ")}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
