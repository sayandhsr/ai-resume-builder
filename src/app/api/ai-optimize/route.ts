import { NextResponse } from 'next/server';

export async function GET() {
    const key = process.env.OPENROUTER_API_KEY;
    console.log("Diagnostic GET received at /api/ai-optimize. Key exists:", !!key);
    
    if (!key) {
        return NextResponse.json({ status: "error", message: "API Key missing in environment variables" }, { status: 500 });
    }
    
    try {
        const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
            headers: { "Authorization": `Bearer ${key}` }
        });
        const data = await res.json();
        return NextResponse.json({ 
            status: res.ok ? "ok" : "error", 
            key_status: data,
            deployment: process.env.VERCEL ? "vercel" : "local",
            message: "If you see 'No endpoints found' for free models, ensure 'Enable training and logging' is ON in your OpenRouter Privacy Settings."
        });
    } catch (e: any) {
        return NextResponse.json({ status: "error", message: e.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    console.log("AI Optimization request received at /api/ai-optimize");
    
    try {
        const body = await req.json();
        const { section, rawText, role, tone, model = "meta-llama/llama-3.1-8b-instruct" } = body;
        
        console.log("Request Payload:", { section, role, tone, model, textLength: rawText?.length });

        if (!rawText) {
            return NextResponse.json({ error: "Missing text to optimize" }, { status: 400 });
        }

        const openRouterApiKey = process.env.OPENROUTER_API_KEY;

        if (!openRouterApiKey) {
            console.error("CRITICAL: OPENROUTER_API_KEY is missing from environment variables");
            return NextResponse.json({ error: "Server configuration error: API Key missing" }, { status: 500 });
        }

        const systemPrompt = `You are an expert ATS resume optimizer. 
        Focus on professional tone: ${tone || 'ATS-optimized'}.
        Target Role: ${role || 'Professional'}.
        Section: ${section || 'General'}.
        
        Guidelines:
        1. Return ONLY the optimized plain text. 
        2. No introductory text, no quotes, no explanations.
        3. Use strong action verbs and quantifiable achievements.`;

        console.log("Calling OpenRouter API...");

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openRouterApiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://ai-resume-builder.vercel.app",
                "X-Title": "AI Resume Builder",
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: rawText }
                ],
            }),
        });

        console.log("OpenRouter Response Status:", response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenRouter API Error:", errorData);
            
            let errorMessage = errorData.error?.message || `API error: ${response.status}`;
            
            if (errorMessage.toLowerCase().includes("no endpoints found")) {
                errorMessage = "No AI endpoints found. This often happens because 'Enable training and logging' is OFF in your OpenRouter Privacy Settings, which is required for free models. Please check your settings at openrouter.ai/settings/privacy";
            }

            return NextResponse.json({ 
                error: errorMessage,
                details: errorData
            }, { status: response.status });
        }

        const data = await response.json();
        console.log("OpenRouter Response Data received successfully");

        const optimizedContent = data.choices?.[0]?.message?.content?.trim();

        if (!optimizedContent) {
            console.error("OpenRouter returned empty content. Full response:", JSON.stringify(data));
            return NextResponse.json({ error: "AI failed to generate content" }, { status: 500 });
        }

        return NextResponse.json({ optimizedContent });

    } catch (error: any) {
        console.error("Exception in /api/ai-optimize:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
