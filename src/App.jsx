import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { groq, getGroqChatCompletion } from './services/api'

function App() {

  const handleClick = async () => {
    try {
      const response = await getGroqChatCompletion();
      console.log(response);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
    }
  }

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
        <button type="button" onClick={handleClick}>
          Click on me
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
