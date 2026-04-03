"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PersonalInfoForm() {
    const { data, updatePersonalInfo } = useResumeStore();
    const { personalInfo } = data;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updatePersonalInfo({ [e.target.name]: e.target.value });
    };

    return (
        <Card className="border-none shadow-sm bg-card text-card-foreground">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Enter your contact details to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            value={personalInfo.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={personalInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={personalInfo.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="New York, NY"
                            value={personalInfo.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                            id="linkedin"
                            name="linkedin"
                            placeholder="linkedin.com/in/johndoe"
                            value={personalInfo.linkedin}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub URL</Label>
                        <Input
                            id="github"
                            name="github"
                            placeholder="github.com/johndoe"
                            value={personalInfo.github}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="portfolio">Portfolio / Website</Label>
                        <Input
                            id="portfolio"
                            name="portfolio"
                            placeholder="johndoe.com"
                            value={personalInfo.portfolio}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
