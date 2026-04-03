import * as React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Check, Columns, FileText } from "lucide-react";

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
  { id: "devops-engineer", name: "DevOps Engineer Resume", category: "Role-Based", is简Recommended: false },
  { id: "ui-ux-designer", name: "UI/UX Designer Resume", category: "Role-Based", isRecommended: false },
  { id: "product-manager", name: "Product Manager Resume", category: "Role-Based", isRecommended: false },
  { id: "business-analyst", name: "Business Analyst Resume", category: "Role-Based", isRecommended: false },
  { id: "cybersecurity", name: "Cybersecurity Resume", category: "Role-Based", isRecommended: false },
  { id: "cloud-engineer", name: "Cloud Engineer Resume", category: "Role-Based", isRecommended: false },
  { id: "mobile-developer", name: "Mobile Developer Resume", category: "Role-Based", isRecommended: false },
];

export function TemplateSelector() {
  const { data, updateSettings } = useResumeStore();
  const selectedTemplate = data.settings.templateId || "classic-ats";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Select Resume Template</h2>
        <p className="text-sm text-muted-foreground">Choose a strictly ATS-friendly layout. Changing this alters typography and spacing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[500px] overflow-y-auto pr-2 pb-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              onClick={() => updateSettings({ templateId: template.id })}
              className={`
                group relative flex flex-col gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-sm 
                transition-all duration-300 cursor-pointer overflow-hidden
                hover:shadow-md hover:-translate-y-0.5
                ${isSelected ? "border-primary ring-2 ring-primary" : "border-border/50 hover:border-primary/50"}
              `}
            >
              {/* Preview Thumbnail Mockup */}
              <div className={`
                flex-1 aspect-[1/1.4] bg-background border border-border/50 rounded flex flex-col p-4 opacity-80
                ${isSelected ? "opacity-100" : "group-hover:opacity-100"} transition-opacity
              `}>
                 <div className="h-2 w-1/2 bg-muted-foreground/30 rounded mb-4" />
                 <div className="h-1 w-full bg-muted-foreground/20 rounded mb-2" />
                 <div className="h-1 w-5/6 bg-muted-foreground/20 rounded mb-2" />
                 <div className="h-1 w-full bg-muted-foreground/20 rounded mb-2" />
                 <div className="mt-auto flex justify-center">
                   {template.isRecommended && (
                     <span className="text-[8px] uppercase tracking-wider font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Recommended</span>
                   )}
                 </div>
              </div>

              {/* Labels & Details */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm leading-tight">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.category}</p>
                </div>
                {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                 <span className="text-[10px] bg-background text-foreground border border-border/50 px-1.5 py-0.5 rounded-full shadow-sm">
                   ATS
                 </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
