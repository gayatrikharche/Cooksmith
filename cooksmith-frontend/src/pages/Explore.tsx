// src/pages/Explore.tsx

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-amber-600 mb-4">🔍 Explore a Recipe</h2>

      <textarea
        className="w-full h-40 p-4 border border-stone-300 rounded-lg shadow-inner font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder="Paste structured recipe JSON here..."
        value={structuredJSON}
        onChange={(e) => setStructuredJSON(e.target.value)}
      />

      <input
        className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder="Ask a question about the recipe..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full shadow-md transition"
      >
         Ask AI
      </button>

      {answer && (
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">💡 AI Answer</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm text-stone-700">
            {answer}
          </pre>
        </div>
      )}
    </motion.div>
  );
}
