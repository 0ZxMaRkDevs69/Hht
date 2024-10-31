const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function callChatGPT(message) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling ChatGPT:', error);
        return 'عذرًا، حدث خطأ أثناء الاتصال بـ ChatGPT.';
    }
}

async function callGemini(message) {
    try {
        const response = await axios.post(
            'https://api.gemini.com/endpoint', // قم بتعديل الرابط حسب API Gemini
            { query: message },
            {
                headers: {
                    'Authorization': `Bearer ${GEMINI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.response;
    } catch (error) {
        console.error('Error calling Gemini:', error);
        return 'عذرًا، حدث خطأ أثناء الاتصال بـ Gemini.';
    }
}

function processCommand(message) {
    if (message.startsWith('ChatGPT:')) {
        const userMessage = message.replace('ChatGPT:', '').trim();
        return callChatGPT(userMessage);
    } else if (message.startsWith('Gemini:')) {
        const userMessage = message.replace('Gemini:', '').trim();
        return callGemini(userMessage);
    } else {
        return 'يرجى استخدام "ChatGPT:" أو "Gemini:" لبدء التفاعل.';
    }
}

module.exports = { processCommand };
