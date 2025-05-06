import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function Explore() {
  const [structuredJSON, setStructuredJSON] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadMsg, setUploadMsg] = useState<string>("");

  const handleAsk = async () => {
    const form = new FormData();
    form.append("recipe_json", structuredJSON);
    form.append("question", question);

    const res = await axios.post<{ answer: string }>(`${BASE_URL}/ask`, form);
    setAnswer(res.data.answer);
  };

  const handleUploadPDF = async () => {
    if (!pdfFile) return;
    const formData = new FormData();
    formData.append("file", pdfFile);
  
    try {
      const res = await axios.post<{ message: string }>(
        `${BASE_URL}/upload`,
        formData
      );
      setUploadMsg(res.data.message);
  
      const filename = pdfFile.name.replace(/\.pdf$/, ".txt");
  
      // ✅ This line fixes the "unknown" type error:
      const textRes = await axios.get<string>(`/data/parsed/${filename}`, {
        responseType: "text",
      });
  
      setStructuredJSON(textRes.data); // ✅ Now correctly typed
    } catch (err) {
      setUploadMsg("❌ Upload failed or parsed text not found.");
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-3xl mx-auto p-6"
    >
      <h2 className="text-3xl font-bold text-amber-600 mb-4">🔍 Explore a Recipe</h2>

      {/* PDF Upload */}
      <div className="space-y-2">
        <label className="font-semibold block">📄 Upload a Recipe PDF:</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUploadPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          📤 Upload PDF
        </button>
        {uploadMsg && <p className="text-sm text-green-700">{uploadMsg}</p>}
      </div>

      {/* Extracted or Pasted Recipe Text */}
      <textarea
        className="w-full h-40 p-4 border border-stone-300 rounded-lg shadow-inner font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder="Parsed recipe JSON or structured text will appear here..."
        value={structuredJSON}
        onChange={(e) => setStructuredJSON(e.target.value)}
      />

      {/* Ask a Question */}
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
        ❓ Ask AI
      </button>

      {/* Answer Display */}
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
