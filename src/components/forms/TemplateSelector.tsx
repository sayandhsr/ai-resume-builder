"use client";

import * as React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

export const templates = [
  // Style-Based
  { id: "classic-ats", name: "Classic ATS", category: "Style-Based", isRecommended: true },
  { id: "minimal-ats", name: "Minimal ATS", category: "Style-Based", isRecommended: false },
  { id: "professional-ats", name: "Professional ATS", category: "Style-Based", isRecommended: true },
  { id: "modern-ats", name: "Modern ATS", category: "Style-Based", isRecommended: false },
  { id: "executive-ats", name: "Executive ATS", category: "Style-Based", isRecommended: false },
  { id: "clean-ats", name: "Clean ATS", category: "Style-Based", isRecommended: false },
  { id: "compact-ats", name: "Compact ATS", category: "Style-Based", isRecommended: false },
  { id: "elegant-ats", name: "Elegant ATS", category: "Style-Based", isRecommended: false },
  { id: "structured-ats", name: "Structured ATS", category: "Style-Based", isRecommended: false },
  { id: "standard-resume", name: "Standard Resume", category: "Style-Based", isRecommended: false },

  // Role-Based
  { id: "data-scientist", name: "Data Scientist Resume", category: "Role-Based", isRecommended: false },
  { id: "ml-engineer", name: "Machine Learning Engineer Resume", category: "Role-Based", isRecommended: false },
  { id: "ai-engineer", name: "AI Engineer Resume", category: "Role-Based", isRecommended: false },
  { id: "web-developer", name: "Web Developer Resume", category: "Role-Based", isRecommended: true },
  { id: "frontend-developer", name: "Frontend Developer Resume", category: "Role-Based", isRecommended: false },
  { id: "backend-developer", name: "Backend Developer Resume", category: "Role-Based", isRecommended: false },
  { id: "fullstack-developer", name: "Full Stack Developer Resume", category: "Role-Based", isRecommended: false },
  { id: "software-engineer", name: "Software Engineer Resume", category: "Role-Based", isRecommended: true },
  { id: "devops-engineer", name: "DevOps Engineer Resume", category: "Role-Based", isRecommended: false },
  { id: "ui-ux-designer", name: "UI/UX Designer Resume", category: "Role-Based", isRecommended: false },
  { id: "product-manager", name: "Product Manager Resume", category: "Role-Based", isRecommended: false },
  { id: "business-analyst", name: "Business Analyst Resume", category: "Role-Based", isRecommended: false },
  { id: "cybersecurity", name: "Cybersecurity Resume", category: "Role-Based", isRecommended: false },
  { id: "cloud-engineer", name: "Cloud Engineer Resume", category: "Role-Based", isRecommended: false },
  { id: "mobile-developer", name: "Mobile Developer Resume", category: "Role-Based", isRecommended: false },
];

const getMiniTemplateStyles = (id: string) => {
    const base = {
        fontFamily: "Arial, sans-serif",
        nameAlign: "text-center",
        headingStyle: "uppercase border-b border-black/20 pb-0.5 mb-1 font-bold text-black",
        itemSpacing: "space-y-1.5"
    };

    if (id.includes("minimal") || id.includes("clean")) return { ...base, nameAlign: "text-left", headingStyle: "font-bold mb-0.5 text-black", itemSpacing: "space-y-[3px]" };
    if (id.includes("professional") || id.includes("executive")) return { ...base, fontFamily: "Helvetica, sans-serif", headingStyle: "uppercase border-b-[1.5px] border-black/80 pb-0.5 mb-1 font-bold" };
    if (id.includes("modern") || id.includes("elegant")) return { ...base, fontFamily: "Inter, sans-serif", nameAlign: "text-left" };
    if (["data-scientist", "software-engineer", "web-developer", "fullstack-developer"].includes(id)) {
        return { ...base, fontFamily: "Helvetica, sans-serif", nameAlign: "text-left" };
    }
    
    return base;
};

const TemplatePreview = ({ templateId }: { templateId: string }) => {
    const styles = getMiniTemplateStyles(templateId);

    return (
        <div style={{ fontFamily: styles.fontFamily }} className="w-full aspect-[1/1.4] bg-white text-black rounded-sm shadow-md border border-neutral-200 p-3 overflow-hidden flex flex-col text-[10px] leading-[1.3]">
            {/* Name & Contact */}
            <div className={`${styles.nameAlign} border-b border-black/10 pb-1 mb-1 shrink-0`}>
                <h4 className="font-bold text-[12px] uppercase">John Doe</h4>
                <p className="text-[6px] text-gray-500">Software Engineer | San Francisco, CA</p>
                <p className="text-[5px] text-gray-500">john@example.com | linkedin.com/in/johndoe</p>
            </div>
            
            {/* Experience */}
            <div className="mb-1 shrink-0">
                <h5 className={`${styles.headingStyle} text-[7px]`}>Experience</h5>
                <div className={styles.itemSpacing}>
                    <div>
                        <div className="flex justify-between font-bold text-[6.5px]">
                            <span>Senior React Developer</span>
                            <span className="font-normal text-[5.5px]">2022 - Present</span>
                        </div>
                        <p className="text-[5.5px] italic text-gray-600">Tech Solutions Inc, CA</p>
                        <ul className="list-disc pl-2.5 text-[5.5px] space-y-[1px] mt-0.5">
                            <li>Architected micro-frontend architecture scaling to 5M+ users</li>
                            <li>Optimized web vitals resulting in a 45% increase in conversion</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className="mb-1 shrink-0">
                <h5 className={`${styles.headingStyle} text-[7px]`}>Education</h5>
                <div className={styles.itemSpacing}>
                    <div className="flex justify-between items-baseline">
                        <div className="font-bold text-[6.5px]">B.S. Computer Science</div>
                        <div className="text-[5.5px] text-gray-600">2018 - 2022</div>
                    </div>
                    <div className="text-[5.5px] text-gray-600">University of California, Berkeley</div>
                </div>
            </div>
            
            {/* Projects */}
            <div className="mb-1 shrink-0">
                <h5 className={`${styles.headingStyle} text-[7px]`}>Projects</h5>
                <div className={styles.itemSpacing}>
                    <div>
                        <div className="flex justify-between items-baseline font-bold text-[6.5px]">
                            <span>AI Resume Builder</span>
                            <span className="font-normal text-[5.5px] text-indigo-600">github.com/johndoe/project</span>
                        </div>
                        <p className="text-[5.5px] mt-0.5">Developed an end-to-end SAAS platform using React, Node.js and OpenAI API reaching 10k MRR.</p>
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="mt-auto shrink-0 pb-1">
                <h5 className={`${styles.headingStyle} text-[7px]`}>Skills</h5>
                <p className="text-[6px]"><span className="font-bold">Core:</span> React, TypeScript, Next.js, Node.js, Tailwind</p>
            </div>
        </div>
    );
};

export function TemplateSelector() {
  const { data, updateSettings } = useResumeStore();
  const selectedTemplate = data.settings.templateId || "classic-ats";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Select Resume Template</h2>
        <p className="text-sm text-muted-foreground">Pick a strictly ATS-friendly layout. Changing this dynamically alters formatting and spacing on your preview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[550px] overflow-y-auto pr-2 pb-6 custom-scrollbar">
        {templates.map((template, idx) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateSettings({ templateId: template.id })}
              className={`
                group relative flex flex-col gap-3 rounded-xl bg-card p-4 text-card-foreground shadow-sm 
                transition-all duration-200 cursor-pointer overflow-hidden
                hover:shadow-md
                ${isSelected 
                  ? "border-2 border-indigo-500 ring-4 ring-indigo-500/20" 
                  : "border border-border/50 hover:border-indigo-400/50"}
              `}
            >
              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                 {template.isRecommended && (
                   <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-sm">
                     <Star className="h-2.5 w-2.5 fill-amber-950" /> PRO
                   </span>
                 )}
                 <span className="text-[9px] bg-primary text-primary-foreground uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-sm">
                   ATS
                 </span>
              </div>

              {/* Real Resume Mockup Preview */}
              <div className={`relative ${isSelected ? "opacity-100" : "opacity-90"} group-hover:opacity-100 transition-opacity`}>
                 <TemplatePreview templateId={template.id} />
                 {/* Subtle gradient overlay to push attention to title */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-sm" />
              </div>

              {/* Template Meta Context */}
              <div className="flex items-start justify-between mt-1">
                <div>
                  <h3 className="font-semibold text-sm leading-tight group-hover:text-indigo-500 transition-colors">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.category}</p>
                </div>
                {isSelected && (
                   <motion.div 
                     initial={{ scale: 0 }} animate={{ scale: 1 }} 
                     className="bg-indigo-500 text-white rounded-full p-0.5 shrink-0"
                   >
                     <Check className="h-3.5 w-3.5" />
                   </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
