// src/pages/Explore.tsx

import React, { useState } from "react";
import axios from "axios";

export default function Explore() {
  const [structuredJSON, setStructuredJSON] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    const form = new FormData();
    form.append("recipe_json", structuredJSON);
    form.append("question", question);
    const res = await axios.post<{ answer: string }>("http://localhost:8000/ask", form);
    setAnswer(res.data.answer);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-lime-700 mb-4">🔍 Ask About a Recipe</h2>

      <textarea
        className="w-full h-40 border p-3 font-mono text-sm rounded"
        placeholder="Paste parsed recipe JSON here..."
        value={structuredJSON}
        onChange={(e) => setStructuredJSON(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Ask a question about the recipe..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        ❓ Ask AI
      </button>

      {answer && (
        <div className="bg-blue-50 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">💡 AI Answer</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm">{answer}</pre>
        </div>
      )}
    </div>
  );
}
