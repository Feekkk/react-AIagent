import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ollamaLogo from "./assets/ollama.svg";
import "./App.css";
import { getAIResponseWithActions } from "./services/api";

function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const result = await getAIResponseWithActions(
        "Please give me some ideas for activities to do this afternoon."
      );
      console.log("API result:", result);
      setResponse(result);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setResponse("Error fetching chat completion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    // Split into numbered points if they exist
    const lines = text.split("\n").filter((line) => line.trim());

    return lines.map((line, index) => {
      // If it's a numbered list item
      if (line.match(/^\d+\./)) {
        return (
          <div key={index} style={{ marginBottom: "0.8rem" }}>
            <strong style={{ color: "var(--primary-cyan)" }}>{line}</strong>
          </div>
        );
      }
      return (
        <div key={index} style={{ marginBottom: "0.5rem" }}>
          {line}
        </div>
      );
    });
  };

  return (
    <>
      <h1>AI AGENT</h1>
      <p
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          color: "#94a3b8",
          fontSize: "1.2rem",
          marginBottom: "2rem",
        }}
      >
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
          className={loading ? "loading-dots" : ""}
        >
          {loading ? "Processing Request" : "🚀 Generate AI Suggestions"}
        </button>

        {response && (
          <div className="response-container">
            <h3>🎯 Activity Suggestions</h3>
            <div>{formatResponse(response)}</div>
          </div>
        )}
      </div>

      <p className="info-text">
        🔮 Harnessing decentralized AI intelligence for personalized
        recommendations
        <br />⚡ Powered by local GPU acceleration for instant responses
      </p>
    </>
  );
}

export default App;
