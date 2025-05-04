import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [recipeText, setRecipeText] = useState("");
  const [transformed, setTransformed] = useState("");
  const [goal, setGoal] = useState("healthy");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [structuredJSON, setStructuredJSON] = useState("");

  const handleTransform = async () => {
    const form = new FormData();
    form.append("recipe_text", recipeText);
    form.append("goal", goal);

    const res = await axios.post<{ transformed: string }>(
      "http://localhost:8000/transform_explain",
      form
    );

    setTransformed(res.data.transformed);
  };

  const handleAsk = async () => {
    const form = new FormData();
    form.append("recipe_json", structuredJSON);
    form.append("question", question);

    const res = await axios.post<{ answer: string }>(
      "http://localhost:8000/ask",
      form
    );

    setAnswer(res.data.answer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-lime-100 p-6 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-lime-700">🧠 Cooksmith</h1>
        <p className="text-gray-600 text-xl mt-2">
          Transform & explore recipes using AI: healthy, fusion, or fantastical.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">📋 Paste Recipe Text</h2>
          <textarea
            className="w-full h-56 border p-3 rounded"
            placeholder="Paste recipe here..."
            value={recipeText}
            onChange={(e) => setRecipeText(e.target.value)}
          />

          <label className="block mt-4 font-medium">🎯 Transformation Goal:</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="healthy">Healthy</option>
            <option value="fusion">Fusion</option>
            <option value="story">Fairytale</option>
          </select>

          <button
            className="mt-4 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
            onClick={handleTransform}
          >
            🔁 Transform Recipe
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">🧠 Transformed Output</h2>
          <textarea
            className="w-full h-72 border p-3 rounded bg-green-50"
            readOnly
            value={transformed}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">🔍 Structured JSON (for Q&A)</h2>
          <textarea
            className="w-full h-60 border p-3 font-mono text-xs rounded"
            placeholder="Paste parsed recipe JSON here..."
            value={structuredJSON}
            onChange={(e) => setStructuredJSON(e.target.value)}
          />

          <input
            className="w-full mt-4 p-2 border rounded"
            placeholder="Ask a question about this recipe..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            onClick={handleAsk}
          >
            ❓ Ask AI
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">💡 AI Answer</h2>
          <div className="whitespace-pre-wrap bg-blue-50 h-60 p-4 rounded overflow-y-scroll">
            {answer || "AI will answer your question here."}
          </div>
        </div>
      </div>
    </div>
  );
}
