import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Copyleft, Sparkles, FileText, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" /> AI Powered Resume Optimization
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Land Your Dream Job with an <br className="hidden md:block" />
          <span className="text-primary mt-2 inline-block">ATS-Optimized Resume</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create a clean, professional resume in minutes. Enter your details and let our AI optimize your experience to bypass Applicant Tracking Systems.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-lg rounded-xl" asChild>
            <Link href="/builder">
              Create Resume Now
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl" asChild>
            <Link href="#features">
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="grid sm:grid-cols-3 gap-8 pt-16 w-full text-left">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">AI Optimization</h3>
          <p className="text-muted-foreground leading-relaxed">Instantly rewrite your job descriptions into impactful, professional bullet points tailored to your sector.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">ATS-Friendly</h3>
          <p className="text-muted-foreground leading-relaxed">Generate designs and structures specifically tested to pass through automated Applicant Tracking Systems smoothly.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">PDF Export</h3>
          <p className="text-muted-foreground leading-relaxed">Preview your resume live as you build it, and export directly to a flawless PDF file ready to send to employers.</p>
        </div>
      </div>
    </div>
  );
}
