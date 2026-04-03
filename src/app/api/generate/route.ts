import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { 
            section, 
            rawText, 
            role, 
            tone, 
            jobDescription, 
            model = "google/gemini-pro", 
            optimizationType = "ATS Rewrite" 
        } = await req.json();

        if (!rawText) {
            return NextResponse.json({ error: "Missing text to optimize" }, { status: 400 });
        }

        const openRouterApiKey = process.env.OPENROUTER_API_KEY;

        if (!openRouterApiKey) {
            return NextResponse.json({ error: "OpenRouter API Key is missing" }, { status: 500 });
        }

        let systemPrompt = "";
        let userPrompt = rawText;

        const getOptimizationGoal = (type: string) => {
            switch (type) {
                case 'Grammar & spelling':
                    return "Fix all spelling, punctuation, and grammar mistakes. Keep the original meaning and structure mostly intact.";
                case 'Keyword optimization':
                    return "Integrate high-impact industry keywords relevant to the target role. Maintain a natural flow while maximizing ATS score.";
                case 'ATS Rewrite':
                default:
                    return "Perform a deep ATS rewrite. Use strong action verbs, quantify achievements, and mirror the job description's language.";
            }
        };

        if (section === 'full_resume') {
            systemPrompt = `You are a world-class ATS Resume Expert. 
            Goal: ${getOptimizationGoal(optimizationType)}
            
            The user is providing their current resume data in JSON format and a target Job Description.
            Rewrite the resume to be perfectly tailored.
            
            Guidelines:
            1. Ensure the tone is "${tone || 'ATS-optimized'}".
            2. Keep the same JSON structure.
            3. Return ONLY the updated JSON. No markdown, no commentary.`;
            
            userPrompt = `Resume Data (JSON): ${rawText}\n\nTarget Job Description: ${jobDescription || 'N/A'}`;
        } else {
            systemPrompt = `You are an expert ATS Resume Writer. 
            Goal: ${getOptimizationGoal(optimizationType)}
            
            Target Role: "${role || 'General Professional'}".
            Tone: "${tone || 'ATS-optimized'}".
            Section: "${section}".
            
            Guidelines:
            1. Return ONLY the rewritten plain text. No introductory filler.
            2. Be professional and impactful.`;
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openRouterApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                response_format: section === 'full_resume' ? { type: "json_object" } : undefined
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`OpenRouter API Error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        const optimizedContent = data.choices[0]?.message?.content?.trim();

        return NextResponse.json({ optimizedContent });

    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate AI content" }, { status: 500 });
    }
}
