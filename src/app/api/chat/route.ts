import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { COMPANY_NAME, PRODUCTS, SERVICES, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from '@/constants';

// Force dynamic to prevent static caching of API responses
export const dynamic = 'force-dynamic';

const generateContext = () => {
    const productList = PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.description}`).join('\n');
    const serviceList = SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n');

    return `
    You are an AI sales engineer for ${COMPANY_NAME}.
    
    Company Info:
    Name: ${COMPANY_NAME}
    Addr: ${COMPANY_ADDRESS}
    Phone: ${COMPANY_PHONE}
    Email: ${COMPANY_EMAIL}
    
    Products:
    ${productList}
    
    Services:
    ${serviceList}
    
    Goal: Answer customer queries instantly and accurately.
    
    CRITICAL INSTRUCTIONS FOR SPEED:
    1. KEEP RESPONSES UNDER 3 SENTENCES unless a detailed technical spec is requested.
    2. BE DIRECT. Do not fluff.
    3. If asked for price -> "Please contact us for a quote."
    4. Speak professionally but concisely.
    `;
};

export async function POST(req: Request) {
    try {
        const { messages, userMessage } = await req.json();

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: generateContext(),
        });

        const chat = model.startChat({
            history: messages.map((m: any) => ({
                role: m.role,
                parts: [{ text: m.text }]
            }))
        });

        const result = await chat.sendMessage(userMessage.text);
        const response = await result.response;
        const text = response.text() || "I apologize, could you please repeat that?";

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({
            error: error.message || "Internal Server Error"
        }, { status: 500 });
    }
}
