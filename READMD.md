📁 PDF-LITE-Chat-with-Pdf-Without-LLM-s- has two main folders:

backend

frontend
This appears to be a Next.js + Node.js project where you can upload PDFs and chat with them without using an LLM, likely using keyword/sentence matching.

Here’s a ready-to-use README.md you can put in the root of your repository:

# PDF-LITE Chat with PDF (Without LLM)

> A lightweight PDF chat application that lets users upload PDF documents and ask questions about their content — without relying on Large Language Models (LLMs).

🔗 Live Demo: https://pdf-lite-chat-with-pdf-without-llm.vercel.app

---

## 📌 Features

- 📄 Upload PDF files via frontend
- 🗣️ Ask questions about the content
- 🔎 Simple keyword-based matching for answers
- 📚 Saves chat history locally in browser storage
- 🛠️ Backend API with Node.js
- ⚡ Frontend built with Next.js

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (React) |
| Backend | Node.js + Express |
| File Upload | multipart/form-data |
| Search Logic | Keyword extraction + matching |
| Deployment | Vercel (Frontend), Custom server (Backend) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/parassalve11/PDF-LITE-Chat-with-Pdf-Without-LLM-s-
cd PDF-LITE-Chat-with-Pdf-Without-LLM-s-

📦 Backend Setup
1. Navigate to backend folder
cd backend

2. Install dependencies
npm install

3. Create .env file

Create a file named .env:

PORT=4000

4. Run the backend
npm run dev

🌐 Frontend Setup
1. Navigate to frontend
cd frontend

2. Install dependencies
npm install

3. Create .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api/v1

4. Run the frontend
npm run dev


Open your browser at:

http://localhost:3000

🧠 Architecture Overview

UploadForm – Component to upload PDFs

ChatInterface – UI for asking questions and seeing answers

Axios API Calls – Communicates with backend (/upload, /ask)

Keyword Matching – Extracts keywords and finds best matching sentence from PDF content

📈 How It Works

User uploads a PDF → Backend stores and extracts text.

User asks a question → Frontend sends question + document ID to backend.

Backend uses keyword extraction → searches in parsed content.

Backend returns best matching sentence as answer.

🛠 Environment Variables
Name	Description
NEXT_PUBLIC_BACKEND_URL	Base backend API URL for frontend
PORT	Port where backend runs

Example .env.local for Next.js:

NEXT_PUBLIC_BACKEND_URL=http://13.233.116.205:4000/api/v1

❗ CORS & HTTPS Notes

To avoid mixed-content issues when deployed over HTTPS:
✔ Serve backend over HTTPS
✔ Or configure frontend proxy in next.config.js

📬 Contributing

Fork the repo ⭐

Create your feature branch

Commit changes ✍️

Open a Pull Request

🚀 License

This project is open source and available under the MIT License.

📌 Acknowledgements

This project uses keyword matching instead of LLMs for quick and affordable PDF QA.

Inspired by AI PDF chat tools like ChatPDF and others. 
GitHub


---

## ✅ Next Step

Just copy that text into a file named:
