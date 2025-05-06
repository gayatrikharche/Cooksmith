// src/pages/Help.tsx

import React from "react";
import { motion } from "framer-motion";

export default function Help() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center"
    >
      <div className="bg-white/90 shadow-xl rounded-xl p-8 max-w-3xl space-y-6 text-stone-800">
        <h2 className="text-4xl font-extrabold text-amber-600">🔍 What is Cooksmith?</h2>
        <p className="text-lg leading-relaxed">
          <strong>Cooksmith</strong> is an AI-powered recipe transformation and exploration tool.
          You can upload recipe PDFs or paste recipe text, then choose a transformation goal to
          make it <span className="font-semibold text-lime-700">healthier</span>,
          turn it into a <span className="font-semibold text-purple-700">whimsical fairytale</span>,
          or fuse it with <span className="font-semibold text-pink-700">another cuisine</span>.
        </p>

        <h3 className="text-2xl font-bold text-blue-700 mt-4">✨ Key Features</h3>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li>
            <strong>Upload & Extract:</strong> Upload recipe PDFs to automatically extract and structure recipe data.
          </li>
          <li>
            <strong>Transform Recipes:</strong> Under the <span className="text-amber-700 font-medium">Home</span> tab, choose from three transformation modes:
            <ul className="list-disc list-inside ml-5 mt-1 text-sm space-y-1">
              <li><strong>Healthy:</strong> Rewrites your recipe to reduce sugar, fat, sodium, and suggest nutritious alternatives.</li>
              <li><strong>Fusion:</strong> Blends your recipe with global cuisines like Korean, Mexican, or Indian by swapping ingredients creatively.</li>
              <li><strong>Story:</strong> Turns your recipe into a fantasy-themed short story with poetic and magical descriptions.</li>
            </ul>
          </li>
          <li>
            <strong>Explore Recipes:</strong> Under the <span className="text-teal-700 font-medium">Explore</span> tab, paste the structured JSON and ask any questions (e.g., nutrition content, number of ingredients, substitutions).
          </li>
          <li>
            <strong>History:</strong> View all your transformed recipes and previous questions in the <span className="text-blue-700 font-medium">History</span> tab.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-teal-700 mt-4">🧠 How It Works</h3>
        <ol className="list-decimal list-inside space-y-2 text-base">
          <li>You upload or paste a recipe.</li>
          <li>Cooksmith parses the ingredients, nutrition, and directions.</li>
          <li>It transforms the recipe based on your goal using an AI model.</li>
          <li>You can also ask questions about the structured data.</li>
        </ol>

        <h3 className="text-2xl font-bold text-rose-700 mt-4">🛠 Technologies Used</h3>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li>Frontend: React + Tailwind CSS + Framer Motion</li>
          <li>Backend: FastAPI + Google Generative AI</li>
          <li>Database: SQLite (for transformation and Q&A history)</li>
        </ul>

        <p className="mt-6 italic text-sm text-stone-500">
          This tool is experimental and intended for creative exploration of cooking ideas. Results may vary. Enjoy playing with your food! 🍽️✨
        </p>
      </div>
    </motion.div>
  );
}
