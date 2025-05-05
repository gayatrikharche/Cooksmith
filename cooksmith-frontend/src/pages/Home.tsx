// src/pages/Home.tsx

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [recipeText, setRecipeText] = useState("");
  const [goal, setGoal] = useState("healthy");
  const [transformed, setTransformed] = useState("");

  const handleTransform = async () => {
    const form = new FormData();
    form.append("recipe_text", recipeText);
    form.append("goal", goal);
    const res = await axios.post<{ transformed: string }>("http://localhost:8000/transform_explain", form);
    setTransformed(res.data.transformed);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-lime-700 mb-4">🔁 Transform a Recipe</h2>

      <textarea
        className="w-full h-48 p-3 border rounded"
        placeholder="Paste your recipe here..."
        value={recipeText}
        onChange={(e) => setRecipeText(e.target.value)}
      />

      <div className="flex items-center space-x-4">
        <label className="font-semibold">Goal:</label>
        <select
          className="p-2 border rounded"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="healthy">Healthy</option>
          <option value="fusion">Fusion</option>
          <option value="story">Story</option>
        </select>
        <button
          onClick={handleTransform}
          className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
        >
          Transform
        </button>
      </div>

      {transformed && (
        <div className="bg-green-50 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">🍽 Transformed Output</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm">{transformed}</pre>
        </div>
      )}
    </div>
  );
}
