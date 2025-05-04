import React, { useState } from "react";

export default function App() {
  const [recipeText, setRecipeText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [goal, setGoal] = useState("healthy");

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-lime-100 p-4">
      <div className="text-center py-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-lime-700">
          🧠 Cooksmith
        </h1>
        <p className="text-gray-600 mt-2 text-xl">
          Transform your recipes with AI: Healthy, Fusion, or Fairytale-style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">📤 Upload Recipes</h2>
          <input type="file" accept=".zip" className="file-input" />
          <p className="text-sm text-muted-foreground mt-2">
            Upload a ZIP of recipe PDFs
          </p>
          <button className="mt-4 bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
            Upload & Parse
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">🎯 Choose Transformation</h2>
          <select
            className="w-full p-2 border rounded"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="healthy">Healthy</option>
            <option value="story">Story</option>
            <option value="fusion">Fusion</option>
          </select>
          <button className="mt-4 bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
            Transform Selected
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12">
        <h3 className="text-xl font-bold mb-2">🪞 Output Viewer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            placeholder="Original Recipe..."
            className="w-full h-64 p-4 border rounded"
            value={recipeText}
            onChange={(e) => setRecipeText(e.target.value)}
          />
          <textarea
            placeholder="Transformed Recipe..."
            className="w-full h-64 p-4 border rounded bg-green-50"
            value={transformedText}
            readOnly
          />
        </div>
      </div>
    </main>
  );
}
