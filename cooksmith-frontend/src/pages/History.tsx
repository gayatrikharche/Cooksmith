// src/pages/History.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

interface RecipeHistoryEntry {
  id: number;
  original_name: string;
  goal: string;
  transformed_text: string;
}

interface QuestionHistoryEntry {
  id: number;
  question: string;
  answer: string;
  recipe_json: string;
}

export default function History() {
  const [recipes, setRecipes] = useState<RecipeHistoryEntry[]>([]);
  const [questions, setQuestions] = useState<QuestionHistoryEntry[]>([]);

  useEffect(() => {
    axios
      .get<RecipeHistoryEntry[]>("http://localhost:8000/recipes")
      .then((res) => setRecipes(res.data));

    axios
      .get<QuestionHistoryEntry[]>("http://localhost:8000/questions")
      .then((res) => setQuestions(res.data));
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-lime-700 mb-4">📜 Transformation History</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {recipes.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold text-lime-800 mb-1">{r.original_name}</h3>
              <p className="text-sm text-gray-600 mb-2">Goal: {r.goal}</p>
              <div className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-6">
                {r.transformed_text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-blue-700 mb-4">💬 Q&A History</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow p-4">
              <p className="text-sm text-gray-700 font-semibold mb-1">Q: {q.question}</p>
              <p className="text-sm text-gray-600 italic">A: {q.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
