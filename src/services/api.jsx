import Groq from "groq-sdk";
import { getCurrentWeather, getLocation } from "./tools";

// Groq API key and base URL
export const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  URL: import.meta.env.VITE_GROQ_API_BASE,
  dangerouslyAllowBrowser: true,
});

// Groq chat completion
export const getGroqChatCompletion = async () => {

  // call functions
  const weather = await getCurrentWeather();
  const location = await getLocation();

  return await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    max_tokens: 100,

    messages: [
      {
        role: "user",
        content:
          `Give me a list of activities ideas based on my current location of ${location} and weather of ${weather}`,
      },
    ],
  });
};
