import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ollamaLogo from "./assets/ollama.svg";
import "./App.css";
import { getAIResponseWithActions } from "./services/api";

function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState("");

  const handleClick = async () => {
    try {
      setLoading(true);

      const result = await getAIResponseWithActions(userLocation || null);
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

<div style={{ marginBottom: "2rem", textAlign: "left" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label 
              htmlFor="location" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "var(--primary-cyan)",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: "600"
              }}
            >
              📍 Your Location (optional):
            </label>
            <input
              id="location"
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="e.g., Tokyo, New York, London..."
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "white",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1rem"
              }}
            />
          </div>
        </div>

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
