import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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
      .get<RecipeHistoryEntry[]>(`${BASE_URL}/recipes`)
      .then((res) => setRecipes(res.data));

    axios
      .get<QuestionHistoryEntry[]>(`${BASE_URL}/questions`)
      .then((res) => setQuestions(res.data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      <div>
        <h2 className="text-3xl font-bold text-lime-700 mb-4">📜 Transformation History</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {recipes.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-md p-5 border border-stone-200">
              <h3 className="text-lg font-bold text-amber-700 mb-1">{r.original_name}</h3>
              <p className="text-sm text-stone-600 mb-2">Goal: {r.goal}</p>
              <pre className="text-sm text-stone-800 whitespace-pre-wrap line-clamp-6">
                {r.transformed_text}
              </pre>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-blue-700 mb-4">💬 Q&A History</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow-md p-5 border border-stone-200">
              <p className="text-sm text-stone-800 font-semibold mb-1">Q: {q.question}</p>
              <p className="text-sm text-stone-600 italic">A: {q.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
