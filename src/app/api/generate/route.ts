import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { section, rawText, role, tone } = await req.json();

        if (!rawText) {
            return NextResponse.json({ error: "Missing text to optimize" }, { status: 400 });
        }

        const openRouterApiKey = process.env.OPENROUTER_API_KEY;

        if (!openRouterApiKey) {
            return NextResponse.json({ error: "OpenRouter API Key is missing" }, { status: 500 });
        }

        const systemPrompt = `You are an expert ATS Resume Writer and Career Coach. 
The user is providing a description for their resume's "${section}" section.
Their targeted job role/domain is: "${role || 'General Professional'}".
Their desired tone is: "${tone || 'ATS-optimized'}".

Your tasks:
1. Improve grammar and clarity.
2. Rewrite any bullet points professionally using strong action verbs.
3. Remove unnecessary fluff.
4. Optimize keywords for Applicant Tracking Systems (ATS) relating to their target role.
5. Return ONLY the optimized plain text. Do not include introductory phrases like "Here is the rewritten text:" or markdown backticks for the whole block.`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openRouterApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "google/gemini-pro", // Note: The user specified Gemini Pro support via OpenRouter
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: rawText }
                ],
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
