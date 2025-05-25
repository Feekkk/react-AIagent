import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ollamaLogo from "./assets/ollama.svg";
import "./App.css";
import { getOllamaChatCompletion } from "./services/api";

function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const result = await getOllamaChatCompletion(
        "Please give me some ideas for activities to do this afternoon. im in melaka"
      );
      console.log("API result:", result);
      setResponse(result.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setResponse("Error fetching chat completion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>AI AGENT</h1>
      <p style={{ 
        fontFamily: 'Space Grotesk, sans-serif', 
        color: '#94a3b8', 
        fontSize: '1.2rem',
        marginBottom: '2rem'
      }}>
        Powered by React and Ollama AI
      </p>
      
      <div className="logo-container">
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://ollama.com" target="_blank" rel="noopener noreferrer">
          <img src={ollamaLogo} className="logo" alt="Ollama logo" />
        </a>
      </div>

      <div className="card">
        <button 
          type="button" 
          onClick={handleClick} 
          disabled={loading}
          className={loading ? 'loading-dots' : ''}
        >
          {loading ? "Processing Request" : "🚀 Generate AI Suggestions"}
        </button>
        
        {response && (
          <div className="response-container">
            <h3>AI Oracle Recommendations</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
      
      <p className="info-text">
        🔮 Harnessing decentralized AI intelligence for personalized recommendations
        <br />
        ⚡ Powered by local GPU acceleration for instant responses
      </p>
    </>
  );
}

export default App;