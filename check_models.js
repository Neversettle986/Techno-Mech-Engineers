const { GoogleGenerativeAI } = require("@google/generative-ai");

async function check() {
    const genAI = new GoogleGenerativeAI("AIzaSyBCUe0Yal7CQ3UZ5YpPoeAS7wMVfzkmMZo");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        // Try a simple generation to see if it works or fails
        const result = await model.generateContent("Test");
        console.log("Success with gemini-1.5-flash");
    } catch (e) {
        console.log("Error with gemini-1.5-flash:", e.message);
    }
}

check();
