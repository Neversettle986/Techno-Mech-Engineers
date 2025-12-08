const { GoogleGenAI } = require("@google/genai");

async function test() {
    const apiKey = "AIzaSyAi3NqfGWl3gALtolxx-O0r5Pdlkp6tEZk";
    const ai = new GoogleGenAI({ apiKey });
    try {
        console.log("Testing gemini-pro...");
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash-001', // Trying specific version
            contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
        });
        console.log("Success:", response.text());
    } catch (e) {
        console.error("Error with gemini-1.5-flash-001:", e.message);
        try {
            console.log("Testing gemini-pro...");
            const response2 = await ai.models.generateContent({
                model: 'gemini-pro',
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
            });
            console.log("Success with gemini-pro:", response2.text());
        } catch (e2) {
            console.error("Error with gemini-pro:", e2.message);
        }
    }
}

test();
