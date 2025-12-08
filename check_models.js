
const fs = require('fs');
const path = require('path');

async function checkSpecificModel(apiKey, modelName) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}?key=${apiKey}`);
        const data = await response.json();
        if (data.name) {
            console.log(`[FOUND] ${modelName}`);
        } else {
            console.log(`[MISSING] ${modelName}:`, data.error ? data.error.message : data);
        }
    } catch (e) {
        console.log(`[ERROR] ${modelName}:`, e.message);
    }
}

async function debugModels() {
    try {
        const envPath = path.resolve(__dirname, '.env.local');
        if (!fs.existsSync(envPath)) { console.error("No .env.local"); return; }
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.*)/);
        if (!match) { console.error("No API Key"); return; }
        const apiKey = match[1].trim();

        console.log("Probing specific models...");
        await checkSpecificModel(apiKey, 'gemini-1.5-flash');
        await checkSpecificModel(apiKey, 'gemini-1.5-flash-001');
        await checkSpecificModel(apiKey, 'gemini-1.5-pro');
        await checkSpecificModel(apiKey, 'gemini-pro');

    } catch (error) {
        console.error("Error:", error);
    }
}

debugModels();
