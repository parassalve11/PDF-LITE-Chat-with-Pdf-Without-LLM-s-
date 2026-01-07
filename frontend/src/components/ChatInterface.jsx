"use client";

import { askQuestions } from "@/api/api";
import { useEffect, useState } from "react";

export default function ChatInterface({ documentId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load chat history
  useEffect(() => {
    if (!documentId) return;

    const stored = localStorage.getItem(`chat_${documentId}`);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, [documentId]);

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        `chat_${documentId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, documentId]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = { text: question, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setQuestion("");
    setError("");

    try {
      const { answer } = await askQuestions(documentId, question);
      setMessages((prev) => [
        ...prev,
        { text: answer, isUser: false },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">
        Chat with PDF (Doc ID: {documentId})
      </h2>

      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.isUser ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 text-white rounded ${
                msg.isUser ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p className="text-gray-500">Thinking...</p>}
      </div>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="w-full p-2 border mb-2"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Ask
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
