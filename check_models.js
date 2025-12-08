const { GoogleGenerativeAI } = require("@google/generative-ai");

async function check() {
    const genAI = new GoogleGenerativeAI("AIzaSyAi3NqfGWl3gALtolxx-O0r5Pdlkp6tEZk");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // Try a simple generation to see if it works or fails
        const result = await model.generateContent("Test");
        console.log("Success with gemini-1.5-flash");
    } catch (e) {
        console.log("Error with gemini-1.5-flash:", e.message);
    }
}

check();
