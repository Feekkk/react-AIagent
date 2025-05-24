import Groq from 'groq-sdk';

export const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    URL: import.meta.env.VITE_GROQ_API_BASE,
    dangerouslyAllowBrowser: true,
});

export const getGroqChatCompletion = async () => {
    return await groq.chat.completions.create({
        
        model: 'llama-3.3-70b-versatile',
        temperature: 0.5,
        max_tokens: 100,

        messages: [
            {
                role: 'system',
                content: 'Hello, how are you?',
            },
            {
                role: 'user',
                content: 'I am fine, thank you!',
            },
        ],
    });
}
