"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { SettingsForm } from "@/components/forms/SettingsForm";
import { TemplateSelector } from "@/components/forms/TemplateSelector";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STEPS = [
    { id: "template", title: "Template" },
    { id: "personal", title: "Personal Info" },
    { id: "education", title: "Education" },
    { id: "experience", title: "Experience" },
    { id: "projects", title: "Projects" },
    { id: "skills", title: "Skills" },
    { id: "settings", title: "Settings" },
];

export function ResumeBuilderStepper() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(curr => curr + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return <TemplateSelector />;
            case 1: return <PersonalInfoForm />;
            case 2: return <EducationForm />;
            case 3: return <ExperienceForm />;
            case 4: return <ProjectsForm />;
            case 5: return <SkillsForm />;
            case 6: return <SettingsForm />;
            default: return null;
        }
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-lg border border-border overflow-visible flex flex-col">
            {/* Stepper Header */}
            <div className="bg-background px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between overflow-x-auto pb-2 gap-4 hide-scrollbar">
                    {STEPS.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        return (
                            <div key={step.id} className="flex flex-col items-center min-w-[70px]">
                                <div
                                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors cursor-pointer
                    ${isActive ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background' :
                                            isCompleted ? 'bg-primary/20 text-primary hover:bg-primary/30' :
                                                'bg-muted text-muted-foreground'}`}
                                    onClick={() => setCurrentStep(index)}
                                >
                                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                                </div>
                                <span className={`text-xs mt-2 font-medium whitespace-nowrap
                  ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Stepper Content — overflow-visible so dropdowns are not clipped */}
            <div className="p-6 bg-background/50 relative min-h-[400px] overflow-visible">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                    >
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Stepper Footer Controls */}
            <div className="p-4 px-6 border-t border-border bg-background flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft className="h-4 w-4" /> Back
                </Button>

                {currentStep === STEPS.length - 1 ? (
                    <Button className="flex items-center gap-2" asChild>
                        <Link href="/preview">
                            <Check className="h-4 w-4" /> Finish & Preview
                        </Link>
                    </Button>
                ) : (
                    <Button onClick={handleNext} className="flex items-center gap-2">
                        Next <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
