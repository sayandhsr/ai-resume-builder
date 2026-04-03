"use client";

import * as React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

export const templates = [
  // Style-Based
  { id: "classic-ats", name: "Classic ATS", category: "Style-Based", isRecommended: true, layout: "classic" },
  { id: "minimal-ats", name: "Minimal ATS", category: "Style-Based", isRecommended: false, layout: "left-align" },
  { id: "professional-ats", name: "Professional ATS", category: "Style-Based", isRecommended: true, layout: "split-header" },
  { id: "modern-ats", name: "Modern ATS", category: "Style-Based", isRecommended: false, layout: "left-align" },
  { id: "executive-ats", name: "Executive ATS", category: "Style-Based", isRecommended: false, layout: "classic" },
  { id: "clean-ats", name: "Clean ATS", category: "Style-Based", isRecommended: false, layout: "split-header" },
  { id: "compact-ats", name: "Compact ATS", category: "Style-Based", isRecommended: false, layout: "classic" },
  { id: "elegant-ats", name: "Elegant ATS", category: "Style-Based", isRecommended: false, layout: "left-align" },
  { id: "structured-ats", name: "Structured ATS", category: "Style-Based", isRecommended: false, layout: "split-header" },
  { id: "standard-resume", name: "Standard Resume", category: "Style-Based", isRecommended: false, layout: "classic" },

  // Role-Based
  { id: "data-scientist", name: "Data Scientist Resume", category: "Role-Based", isRecommended: false, layout: "left-align" },
  { id: "ml-engineer", name: "Machine Learning Engineer Resume", category: "Role-Based", isRecommended: false, layout: "left-align" },
  { id: "ai-engineer", name: "AI Engineer Resume", category: "Role-Based", isRecommended: false, layout: "left-align" },
  { id: "web-developer", name: "Web Developer Resume", category: "Role-Based", isRecommended: true, layout: "split-header" },
  { id: "frontend-developer", name: "Frontend Developer Resume", category: "Role-Based", isRecommended: false, layout: "split-header" },
  { id: "backend-developer", name: "Backend Developer Resume", category: "Role-Based", isRecommended: false, layout: "classic" },
  { id: "fullstack-developer", name: "Full Stack Developer Resume", category: "Role-Based", isRecommended: false, layout: "left-align" },
  { id: "software-engineer", name: "Software Engineer Resume", category: "Role-Based", isRecommended: true, layout: "classic" },
  { id: "devops-engineer", name: "DevOps Engineer Resume", category: "Role-Based", isRecommended: false, layout: "split-header" },
  { id: "ui-ux-designer", name: "UI/UX Designer Resume", category: "Role-Based", isRecommended: false, layout: "left-align" },
  { id: "product-manager", name: "Product Manager Resume", category: "Role-Based", isRecommended: false, layout: "classic" },
  { id: "business-analyst", name: "Business Analyst Resume", category: "Role-Based", isRecommended: false, layout: "split-header" },
  { id: "cybersecurity", name: "Cybersecurity Resume", category: "Role-Based", isRecommended: false, layout: "left-align" },
  { id: "cloud-engineer", name: "Cloud Engineer Resume", category: "Role-Based", isRecommended: false, layout: "classic" },
  { id: "mobile-developer", name: "Mobile Developer Resume", category: "Role-Based", isRecommended: false, layout: "split-header" },
];

const TemplatePreview = ({ layout, isSelected }: { layout: string; isSelected: boolean }) => {
    // We use standard large resolution to prevent clipping, and scale it down.
    // The parent has `overflow-hidden` and exact aspect ratio, so scaling will smoothly map it to fit perfectly inside the card.
    
    // Layout Logic
    const isClassic = layout === "classic";
    const isSplit = layout === "split-header";
    const isLeft = layout === "left-align";

    const fontStyle = isClassic ? "font-serif" : "font-sans";
    const headerBorder = isClassic ? "border-b-2 border-black mb-3 pb-2" : isSplit ? "border-b border-gray-300 mb-3 pb-2" : "border-b-4 border-gray-800 mb-3 pb-2";

    return (
        <div className="absolute inset-0 w-[400px] h-[565px] bg-white text-black p-6 origin-top-left scale-[0.45] md:scale-[0.55] lg:scale-[0.48] xl:scale-[0.55] 2xl:scale-[0.6] pointer-events-none" style={{ fontFamily: fontStyle === "font-serif" ? "Times New Roman, serif" : "Helvetica, sans-serif" }}>
            
            {/* Header */}
            {isClassic && (
                <div className={`text-center ${headerBorder}`}>
                    <h1 className="text-3xl font-bold uppercase tracking-widest">Sayandh SR</h1>
                    <p className="text-[11px] text-gray-700 mt-1">sayandh@example.com | +1 234 567 890 | linkedin.com/in/sayandhsr</p>
                </div>
            )}

            {isLeft && (
                <div className={`text-left ${headerBorder}`}>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900">Sayandh SR</h1>
                    <p className="text-[12px] font-medium text-gray-500 mt-1">sayandh@example.com | github.com/sayandh | San Francisco, CA</p>
                </div>
            )}

            {isSplit && (
                <div className={`flex justify-between items-end ${headerBorder}`}>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tighter">Sayandh SR</h1>
                        <p className="text-[12px] text-gray-600 font-medium">Software Engineer</p>
                    </div>
                    <div className="text-right text-[10px] text-gray-500">
                        <p>sayandh@example.com</p>
                        <p>linkedin.com/in/sayandhsr</p>
                    </div>
                </div>
            )}

            {/* Experience */}
            <div className="mb-4">
                <h2 className="text-[14px] font-bold uppercase mb-1 border-b border-gray-300">Experience</h2>
                <div className="mb-2">
                    <div className="flex justify-between items-baseline">
                        <span className="font-bold text-[12px]">Senior Software Engineer</span>
                        <span className="text-[10px] text-gray-600">Jan 2023 - Present</span>
                    </div>
                    <div className="text-[11px] italic text-gray-800">Acme Corp, Silicon Valley</div>
                    <ul className="list-disc pl-4 text-[10px] space-y-1 mt-1 text-gray-700">
                        <li>Architected cloud-native microservices scaling to process 5M+ daily requests.</li>
                        <li>Reduced latency by 45% utilizing Redis caching and optimized database indexing.</li>
                    </ul>
                </div>
                <div>
                    <div className="flex justify-between items-baseline">
                        <span className="font-bold text-[12px]">Frontend Developer</span>
                        <span className="text-[10px] text-gray-600">Mar 2021 - Dec 2022</span>
                    </div>
                    <div className="text-[11px] italic text-gray-800">Tech Solutions</div>
                    <ul className="list-disc pl-4 text-[10px] space-y-1 mt-1 text-gray-700">
                        <li>Developed responsive web applications using React, Next.js, and Tailwind CSS.</li>
                    </ul>
                </div>
            </div>

            {/* Education */}
            <div className="mb-4">
                <h2 className="text-[14px] font-bold uppercase mb-1 border-b border-gray-300">Education</h2>
                <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[12px]">B.S. Computer Science</span>
                    <span className="text-[10px] text-gray-600">2018 - 2022</span>
                </div>
                <div className="text-[11px] text-gray-800">University of California, Berkeley</div>
            </div>

            {/* Projects */}
            <div className="mb-4">
                <h2 className="text-[14px] font-bold uppercase mb-1 border-b border-gray-300">Projects</h2>
                <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[12px]">AI Resume Builder</span>
                    <span className="text-[10px] text-blue-600">github.com/sayandh/resume-ai</span>
                </div>
                <p className="text-[10px] mt-1 text-gray-700">Built an end-to-end SAAS platform generating ATS-friendly PDFs using Next.js, Supabase, and OpenAI.</p>
            </div>

            {/* Skills */}
            <div>
                <h2 className="text-[14px] font-bold uppercase mb-1 border-b border-gray-300">Skills</h2>
                <p className="text-[11px] text-gray-800"><span className="font-bold">Languages & Frameworks:</span> React, TypeScript, Node.js, Next.js, TailwindCSS, Python</p>
                <p className="text-[11px] text-gray-800 mt-1"><span className="font-bold">Tools:</span> Git, Docker, AWS, Vercel, Supabase, PostgreSQL</p>
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
                group flex flex-col rounded-xl bg-card text-card-foreground shadow-sm 
                transition-all duration-200 cursor-pointer 
                hover:shadow-md
                ${isSelected 
                  ? "border-2 border-indigo-500 ring-4 ring-indigo-500/20" 
                  : "border border-border/50 hover:border-indigo-400/50"}
              `}
            >
              
              {/* Top Banner (Visible Details) */}
              <div className="p-4 border-b border-border/50 bg-muted/20 flex flex-col gap-1 rounded-t-xl">
                 <div className="flex items-start justify-between">
                   <h3 className={`font-bold text-sm leading-tight transition-colors ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "group-hover:text-indigo-500"}`}>{template.name}</h3>
                   {isSelected && (
                     <motion.div 
                       initial={{ scale: 0 }} animate={{ scale: 1 }} 
                       className="bg-indigo-500 text-white rounded-full p-0.5 shrink-0 ml-2"
                     >
                       <Check className="h-3.5 w-3.5" />
                     </motion.div>
                   )}
                 </div>
                 <div className="flex items-center gap-2 mt-1">
                   {template.isRecommended && (
                     <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold bg-amber-400/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full shadow-sm">
                       <Star className="h-2.5 w-2.5" /> PRO
                     </span>
                   )}
                   <span className="text-[9px] bg-primary/10 text-primary uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-sm">
                     ATS FRIENDLY
                   </span>
                 </div>
              </div>

              {/* Real Resume Mockup Preview */}
              <div className="relative w-full aspect-[1/1.414] bg-neutral-100 dark:bg-neutral-900 rounded-b-xl overflow-hidden p-2 md:p-4">
                 {/* The inner paper */}
                 <div className="relative w-full h-full bg-white shadow-sm border border-neutral-200 overflow-hidden rounded-[2px] mx-auto">
                    <TemplatePreview layout={template.layout} isSelected={isSelected} />
                 </div>
                 {/* Shadow Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-b-xl" />
              </div>

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
