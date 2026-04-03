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
            console.error("OpenRouter API Key is missing from Environment Variables");
            return NextResponse.json({ error: "OpenRouter API Key is missing" }, { status: 500 });
        }

        const getOptimizationGoal = (type: string) => {
            switch (type) {
                case 'Grammar & spelling':
                    return "Fix all spelling, punctuation, and grammar mistakes. Keep the original meaning and structure mostly intact.";
                case 'Keyword optimization':
                    return "Integrate high-impact industry keywords relevant to the target role. Maintain a natural flow while maximizing ATS score.";
                case 'ATS Score Booster':
                    return "Maximize the ATS score by aligning perfectly with industry standards. Focus on high-impact keywords, standard headers, and quantifiable metrics.";
                case 'ATS Rewrite':
                default:
                    return "You are an expert ATS resume writer. Rewrite the following resume content to be professional, concise, and optimized for ATS systems. Focus on action verbs, measurable impact, and role-specific keywords.";
            }
        };

        let systemPrompt = "";
        let userPrompt = rawText;

        if (section === 'full_resume') {
            systemPrompt = `You are a world-class ATS Resume Expert. 
            Goal: ${getOptimizationGoal(optimizationType)}
            
            Guidelines:
            1. Tailor the entire resume based on the Job Description: "${jobDescription || 'N/A'}".
            2. Ensure the tone is "${tone || 'ATS-optimized'}".
            3. Use the user's role: "${role || 'General Professional'}" as the target context.
            4. Keep the same JSON structure.
            5. Return ONLY the updated JSON. No markdown, no commentary.`;
            
            userPrompt = `Current Resume Data (JSON): ${rawText}`;
        } else {
            systemPrompt = `You are an expert ATS Resume Writer. 
            Goal: ${getOptimizationGoal(optimizationType)}
            
            Target Role: "${role || 'General Professional'}".
            Tone: "${tone || 'ATS-optimized'}".
            Section: "${section}".
            
            Guidelines:
            1. Return ONLY the rewritten plain text. No introductory filler or quotes.
            2. Focus on measurable impact and action verbs.`;
        }

        console.log(`Calling OpenRouter with model: ${model}, optimization: ${optimizationType}`);

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
            const errorText = await response.text();
            console.error(`OpenRouter API Error (${response.status}):`, errorText);
            return NextResponse.json({ error: `AI API error: ${response.status}` }, { status: response.status });
        }

        const data = await response.json();
        const optimizedContent = data.choices?.[0]?.message?.content?.trim();

        if (!optimizedContent) {
            console.error("OpenRouter returned empty content", data);
            return NextResponse.json({ error: "AI failed to generate content" }, { status: 500 });
        }

        return NextResponse.json({ optimizedContent });

    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate AI content" }, { status: 500 });
    }
}
