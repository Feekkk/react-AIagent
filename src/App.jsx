import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getGroqChatCompletion } from "./services/api";
import { useState } from "react";

function App() {
  const [response, setResponse] = useState(" ");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const result = await getGroqChatCompletion();
      setResponse(result.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setResponse("Error fetching chat completion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={handleClick} disabled={loading}>
          {loading ? "Getting suggestions..." : "Get Activity Suggestions"}
        </button>
        {response && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <h3>AI Suggestions:</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{response}</p>
          </div>
        )}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
