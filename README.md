# AI Agent - Intelligent Activity Recommendation System

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama" />
  <img src="https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI API" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

<div align="center">
  <h3>🤖 A powerful AI-driven activity recommendation system powered by React and Ollama</h3>
  <p>Get personalized activity suggestions based on your location and real-time weather data using local AI processing</p>
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🌟 Overview

AI Agent is an intelligent activity recommendation system that leverages the ReAct (Reasoning + Acting) pattern to provide personalized suggestions. The system uses local AI processing through Ollama, ensuring privacy and fast response times while delivering context-aware recommendations based on user location and weather conditions.

## ✨ Features

### 🎯 Core Functionality
- **Intelligent Reasoning**: Implements ReAct pattern for step-by-step AI reasoning
- **Location-Aware**: Accepts user location input for personalized recommendations
- **Weather Integration**: Considers real-time weather data for activity suggestions
- **Local AI Processing**: Runs entirely on local hardware using Ollama
- **GPU Acceleration**: Optimized for NVIDIA GPU acceleration

### 🎨 User Experience
- **Modern UI/UX**: Web3-inspired design with glassmorphism effects
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Feedback**: Live processing indicators and step-by-step reasoning display
- **Interactive Interface**: Clean input fields for location and custom queries

### 🔧 Technical Features
- **Privacy-First**: No external API calls, all processing happens locally
- **Fast Performance**: GPU-accelerated inference with local LLM
- **Extensible Architecture**: Easy to add new tools and actions
- **Error Handling**: Robust error management and user feedback

## 🎥 Demo

### Main Interface
```
┌─────────────────────────────────────────┐
│              AI AGENT                   │
│    Powered by React and Ollama AI       │
│                                         │
│  [React Logo]     [Ollama Logo]         │
│                                         │
│  📍 Your Location (optional):           │
│  ┌─────────────────────────────────────┐ │
│  │ e.g., Tokyo, New York, London...   │ │
│  └─────────────────────────────────────┘ │
│                                         │
│      🚀 Generate AI Suggestions         │
│                                         │
│  🎯 Activity Suggestions                │
│  ┌─────────────────────────────────────┐ │
│  │ • Visit Central Park for a walk    │ │
│  │ • Explore local museums            │ │
│  │ • Try outdoor cafes (sunny weather)│ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 🛠 Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with hooks
- **Vite 6.3.5** - Fast build tool and development server
- **CSS3** - Custom styling with modern features

### AI & Backend
- **Ollama** - Local LLM inference engine
- **OpenAI SDK 4.103.0** - API client for Ollama compatibility
- **LLaMA 3.2** - Large language model for reasoning

### Development Tools
- **ESLint** - Code linting and formatting
- **SWC** - Fast JavaScript compiler
- **Node.js** - Runtime environment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Ollama** (latest version)
- **NVIDIA GPU** (recommended for best performance)
- **CUDA drivers** (for GPU acceleration)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-agent.git
cd ai-agent
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install and Setup Ollama
```bash
# Install Ollama (Windows)
# Download from: https://ollama.com/download

# Pull the required model
ollama pull llama3.2

# Start Ollama server
ollama serve
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_OLLAMA_BASE_URL=http://localhost:11434
VITE_OLLAMA_MODEL=llama3.2
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## ⚙️ Configuration

### Ollama Configuration
```bash
# Check available models
ollama list

# Pull additional models (optional)
ollama pull codellama
ollama pull mistral

# Configure Ollama settings
export OLLAMA_HOST=0.0.0.0
export OLLAMA_ORIGINS=*
```

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_OLLAMA_BASE_URL` | Ollama server URL | `http://localhost:11434` |
| `VITE_OLLAMA_MODEL` | LLM model name | `llama3.2` |

## 📚 Usage

### Basic Usage
1. **Start the Application**: Run `npm run dev`
2. **Enter Location**: Type your city/location in the input field
3. **Generate Suggestions**: Click the "Generate AI Suggestions" button
4. **View Results**: See personalized activity recommendations

### Advanced Usage
```javascript
// Custom query example
const customQuery = "I want outdoor activities for a sunny day in Tokyo";
const result = await getAIResponseWithActions(customQuery, "Tokyo");
```

### Adding New Tools
```javascript
// Add to tools.jsx
export async function getRestaurants(location, cuisine) {
  // Implementation
}

// Add to api.jsx system prompt
Available actions:
- getRestaurants:
    E.g. getRestaurants: Tokyo, Italian
    Returns restaurant recommendations for the location and cuisine.
```

## 🏗 Architecture

### System Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │───▶│   API Service   │───▶│   Ollama LLM    │
│                 │    │                 │    │                 │
│ • User Input    │    │ • ReAct Logic   │    │ • Local AI      │
│ • UI Components │    │ • Tool Calling  │    │ • GPU Accel     │
│ • State Mgmt    │    │ • Response Parse│    │ • Privacy       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Tool System   │
                       │                 │
                       │ • Weather API   │
                       │ • Location API  │
                       │ • Extensible    │
                       └─────────────────┘
```

### ReAct Pattern Flow
```
User Input → AI Reasoning → Action Selection → Tool Execution → Observation → Final Answer
     ↓              ↓              ↓              ↓              ↓            ↓
"Activities?"  "Need location"  getLocation()    "Tokyo"     "Weather?"   "Sunny activities"
```

### File Structure
```
ai-agent/
├── src/
│   ├── components/          # React components
│   ├── services/
│   │   ├── api.jsx         # Main API logic & ReAct implementation
│   │   └── tools.jsx       # Tool functions (weather, location)
│   ├── assets/             # Images and static files
│   ├── App.jsx             # Main application component
│   ├── App.css             # Styling
│   └── main.jsx            # Entry point
├── public/                 # Public assets
├── .env                    # Environment variables
├── package.json            # Dependencies
└── README.md              # Documentation
```

## 🔌 API Reference

### Core Functions

#### `getAIResponseWithActions(userLocation)`
Main function that orchestrates the ReAct pattern.

**Parameters:**
- `userLocation` (string, optional): User's location

**Returns:**
- `Promise<string>`: Final AI response with recommendations

#### `findAndRunAction(aiText, userLocation)`
Parses AI response and executes actions.

**Parameters:**
- `aiText` (string): AI response text
- `userLocation` (string): User's location

**Returns:**
- `Promise<string>`: Action execution result

### Tool Functions

#### `getCurrentWeather(location)`
Retrieves weather information for a location.

#### `getLocation(userLocation)`
Gets location details.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Project Link**: [https://github.com/Feekkk/ai-agent](https://github.com/yourusername/ai-agent)

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>🔮 Built with ❤️ using React and Ollama</p>
</div>
