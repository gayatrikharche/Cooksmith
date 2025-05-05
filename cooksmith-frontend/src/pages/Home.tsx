// src/pages/Home.tsx

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-amber-600 mb-4">🔁 Transform a Recipe</h2>

      <textarea
        className="w-full h-48 p-4 border border-stone-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder="Paste your recipe here..."
        value={recipeText}
        onChange={(e) => setRecipeText(e.target.value)}
      />

      <div className="flex items-center space-x-4">
        <label className="font-semibold">🎯 Goal:</label>
        <select
          className="p-2 border border-stone-300 rounded-lg bg-white"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="healthy">Healthy</option>
          <option value="fusion">Fusion</option>
          <option value="story">Story</option>
        </select>
        <button
          onClick={handleTransform}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full shadow-md transition"
        >
          🔄 Transform
        </button>
      </div>

      {transformed && (
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-lime-700 mb-2">🍽 Transformed Output</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm text-stone-700">
            {transformed}
          </pre>
        </div>
      )}
    </motion.div>
  );
}
