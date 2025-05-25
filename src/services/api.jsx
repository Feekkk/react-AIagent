import OpenAI from "openai";
import { getCurrentWeather, getLocation } from "./tools";

// Ollama API key and base URL
export const ollama = new OpenAI({
  baseURL: import.meta.env.VITE_OLLAMA_BASE_URL,
  apiKey: 'not-needed',
  dangerouslyAllowBrowser: true,
});
 
// Design a well-written reAct prompt for the AI agent
const systemPrompt = `
You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer. Your final answer should be highly specific to the observations you have from running
the actions.
1. Thought: Describe your thoughts about the question you have been asked.
2. Action: run one of the actions available to you - then return PAUSE.
3. PAUSE
4. Observation: will be the result of running those actions.

Available actions:
- getCurrentWeather: 
    E.g. getCurrentWeather: Salt Lake City
    Returns the current weather of the location specified.
- getLocation:
    E.g. getLocation: null
    Returns user's location details. No arguments needed.

Example session:
Question: Please give me some ideas for activities to do this afternoon.
Thought: I should look up the user's location so I can give location-specific activity ideas.
Action: getLocation: null
PAUSE

You will be called again with something like this:
Observation: "New York City, NY"

Then you loop again:
Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
Action: getCurrentWeather: New York City
PAUSE

You'll then be called again with something like this:
Observation: { location: "New York City, NY", forecast: ["sunny"] }

You then output:
Answer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>
`

// Function to find and run actions
export const findAndRunAction = async (aiText) => {
  
  // split text into lines
  const lines = aiText.split("\n")

  // simple regex to find action lines
  const actionRegex = /Action:\s*(\w+):\s*(.*)/;

  // look through each line for an action
  for (let lines of lines){
    const match = lines.match(actionRegex);
      if (match){
        const actionName = match[1];
        const actionInput = match[2];

        console.log(`Found action: ${actionName}`);
        console.log(`Action input: ${actionInput}`);

        // run the action
        if (actionName === "getCurrentWeather"){
          const result = await getCurrentWeather();
          return `Weather: ${result}`;
        }

        if (actionName === "getLocation"){
          const result = await getLocation();
          return `Location: ${result}`;
        }
        
      }
    }
  return "No action found in AI response.";
}

// Groq chat completion
export const getOllamaChatCompletion = async (query) => {

  return await ollama.chat.completions.create({
    model: import.meta.env.VITE_OLLAMA_MODEL,
    temperature: 0.5,
    max_tokens: 500,

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: query,
      },
    ],
  });
};

// Function to use both the chat completion and action runner
export const getAIResponseWithActions = async (query) => {
    // Get AI response
    const response = await getOllamaChatCompletion(query);
    const aiText = response.choices[0].message.content;
    
    console.log("AI said:", aiText);
    
    // Check if AI wants to do an action
    const actionResult = await findAndRunAction(aiText);
    
    if (actionResult !== "No action found in AI response.") {
        console.log("Action result:", actionResult);
        
        // Send the result back to AI for final answer with cleaner instructions
        const finalResponse = await getOllamaChatCompletion(
            `Based on this information: ${actionResult}\n\nPlease provide a clean, final answer to: "${query}"\n\nOnly provide the answer, no reasoning steps.`
        );
        
        let cleanAnswer = finalResponse.choices[0].message.content;
        
        // Remove any remaining "Answer:" prefix
        cleanAnswer = cleanAnswer.replace(/^Answer:\s*/i, '');
        
        return cleanAnswer;
    }
    
    // No action needed, return AI response
    return aiText;
};