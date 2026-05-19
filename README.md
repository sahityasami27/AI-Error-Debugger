# ErrorDebugger AI

AI-powered debugging assistant for backend logs, API failures, authentication issues, infrastructure errors, and cloud debugging workflows.

Built using Next.js, TypeScript, Tailwind CSS, and the Google Gemini API.

---

# Live Demo

Add your Vercel deployment link here:

```bash
ai-error-debugger.vercel.app
```

---

# Screenshots

Add screenshots here after deployment.

## Home Screen

<img width="1400" alt="home" src="https://via.placeholder.com/1400x700.png?text=ErrorDebugger+AI" />

## AI Analysis Output

<img width="1400" alt="analysis" src="https://via.placeholder.com/1400x700.png?text=AI+Analysis+Output" />

---

# Features

* AI-powered error analysis
* Structured debugging insights
* Root cause identification
* Suggested fixes and prevention steps
* Markdown rendering support
* Resilient JSON parsing
* Graceful fallback handling for malformed LLM responses
* Clean developer-focused UI
* Production-style backend error handling
* Gemini API integration
* Responsive design

---

# Tech Stack

## Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Markdown

## Backend

* Next.js API Routes
* Google Gemini API

## Deployment

* GitHub
* Vercel

---

# Architecture

```text
User Input
   ↓
Frontend UI (Next.js)
   ↓
/api/analyze
   ↓
Gemini API
   ↓
Structured JSON Response
   ↓
Response Normalization
   ↓
Markdown Rendering
   ↓
Developer-Friendly Debugging Insights
```

---

# Problem Statement

Developers frequently encounter cryptic backend logs, API failures, authentication errors, and infrastructure debugging issues.

Most debugging workflows require manually searching documentation, Stack Overflow threads, cloud dashboards, and GitHub issues.

ErrorDebugger AI simplifies this workflow by using Large Language Models to:

* Analyze logs
* Detect root causes
* Explain failures clearly
* Suggest fixes
* Recommend prevention strategies

---

# Key Engineering Challenges Solved

## 1. LLM JSON Parsing Instability

Large Language Models often return malformed or inconsistent JSON.

Implemented:

* Defensive parsing
* Response normalization
* Fallback handling
* Safe defaults for missing fields

---

## 2. Frontend Rendering Crashes

The frontend originally crashed when malformed Gemini responses were passed into ReactMarkdown.

Implemented:

* Type-safe rendering
* Content normalization
* Markdown sanitization
* Graceful UI fallbacks

---

## 3. Markdown Formatting Issues

LLM responses frequently returned inconsistent formatting.

Implemented:

* Automatic bullet point normalization
* Markdown conversion logic
* Resilient rendering pipelines

---

## 4. External API Failures

Handled:

* Invalid API keys
* Model mismatches
* Quota failures
* Gemini API response errors

Implemented:

* Structured backend error handling
* Fallback responses
* Safe API response validation

---

# API Response Schema

```json
{
  "category": "Authentication",
  "rootCause": "The API key is invalid or expired.",
  "explanation": "The request failed because the provided credentials are not valid.",
  "fixSuggestion": "- Verify the API key\n- Regenerate the credentials",
  "prevention": "- Store secrets securely\n- Rotate API keys regularly",
  "severity": "High"
}
```

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/error-debugger-ai.git
```

---

## 2. Navigate Into Project

```bash
cd error-debugger-ai
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## 5. Start Development Server

```bash
npm run dev
```

---

# Deployment

The application is deployed using:

* GitHub for version control
* Vercel for hosting

---

# Future Improvements

* Context memory across debugging sessions
* Multi-model support (OpenAI, Groq, Claude)
* Streaming AI responses
* Feedback and learning loops
* RAG-based documentation retrieval
* Saved debugging history
* Authentication and workspaces
* Observability dashboard
* Token usage analytics
* AI remediation command generation

---

# Resume-Relevant Highlights

This project demonstrates:

* GenAI application engineering
* Prompt engineering
* LLM response normalization
* Defensive parsing strategies
* AI system reliability handling
* Full-stack TypeScript development
* API orchestration
* Production-style frontend resilience
* Backend error handling
* Markdown rendering pipelines

---

# Author

Sahitya

---


