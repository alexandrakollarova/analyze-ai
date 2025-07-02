# Ask Your Data – Chatbot Edition

A conversational interface that lets users upload CSV/JSON files and ask questions about the data using natural language. The chatbot maintains context across turns and leverages LLMs to provide helpful, human-like insights.

---

## 🧠 Project Overview

**Goal**: Create a portfolio-worthy AI project where users can:
- Upload tabular data (CSV or JSON)
- Ask natural-language questions about that data
- Get clear answers with context-aware follow-ups

---

## ✨ Features

### ✅ Core Functionality
- File upload support (CSV, JSON)
- Chat UI with user/AI messages
- OpenAI-powered natural language understanding
- Persistent chat history (context memory)
- In-browser data parsing and storage

### 🧠 AI Capabilities
- Understand and answer questions like:
  - “What are the top 5 regions by sales?”
  - “How did Q2 compare to Q1?”
- Maintain context:
  - “What about last year?”
  - “Now break that down by product line.”

### ⚙️ Optional Enhancements
- Visualize results using charts (e.g., Recharts)
- Export chat transcript
- Save sessions to localStorage
- Multi-file upload management
- Let user customize the system prompt (e.g., "Act like a CFO")

---

## 🧱 Tech Stack

| Layer       | Tools & Libraries          |
|-------------|----------------------------|
| Frontend    | React, Next, Tailwind CSS        |
| Chat UI     | Custom or component library (e.g., shadcn/ui) |
| File Parsing| Papaparse (CSV), JSON.parse |
| LLM API     | OpenAI GPT-4 (via fetch)   |
| State Mgmt  | React Context   |

---

## 📁 File Structure (Planned)

```
analyze-ai-chatbot/
├── public/
├── src/
│   ├── components/
│   │   ├── Chatbot.tsx
│   │   ├── FileUpload.tsx
│   │   └── TablePreview.tsx
│   ├── hooks/
│   ├── utils/
│   │   ├── parseCsv.ts
│   │   └── promptBuilder.ts
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
└── README.md
```

---

## 🧪 Development Plan

### Phase 1: Core Functionality
- [ ] Set up React project
- [ ] Implement file upload + CSV/JSON parsing
- [ ] Display preview table
- [ ] Build chat interface
- [ ] Integrate OpenAI API
- [ ] Send data + question + chat history in prompt

### Phase 2: Context Memory
- [ ] Store chat history in session
- [ ] Include relevant past messages in each prompt
- [ ] Truncate history intelligently if token limit is reached

### Phase 3: Polish & UX
- [ ] Add loading states + error handling
- [ ] Add "Clear chat" and "New file" features
- [ ] Style with Tailwind or design system

### Phase 4: (Optional) Visual Output + Persistence
- [ ] Add chart-based visualizations for numeric answers
- [ ] Store session in localStorage or file

---

## 🔐 Environment Variables

Create a `.env` file:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

