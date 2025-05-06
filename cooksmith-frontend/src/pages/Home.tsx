import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
// const BASE_URL = "http://localhost:8000";

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [goal, setGoal] = useState("healthy");
  const [uploadMsg, setUploadMsg] = useState("");
  const [transformed, setTransformed] = useState("");
  const [readyToTransform, setReadyToTransform] = useState(false);
  const [structuredJSON, setStructuredJSON] = useState<string>("");

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
  
      // const filename = pdfFile.name.replace(/\.pdf$/, ".json");
  
      // const textRes = await axios.get<string>(`../../../backend/data/parsed/${filename}`, {
      //   responseType: "text",
      // });
      setReadyToTransform(true);
      setStructuredJSON(pdfFile.name.replace(/\.pdf$/, ".json")); // ✅ Now correctly typed
    } catch (err) {
      setUploadMsg("❌ Upload failed or parsed text not found.");
    }
  };
  

  const handleTransform = async () => {
    const form = new FormData();
    form.append("recipe_text", structuredJSON);
    form.append("goal", goal);

    const res = await axios.post<{ transformed: string }>(
      `${BASE_URL}/transform_explain`,
      form
    );
    setTransformed(res.data.transformed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-10"
    >
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 space-y-8">
        <h2 className="text-4xl font-extrabold text-amber-600 text-center">
          🍳 Cooksmith Recipe Transformer
        </h2>

        {/* Upload Section */}
        <div className="space-y-2">
          <label className="block font-semibold text-lg text-stone-800">
            📄 Upload a Recipe PDF:
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            className="border border-stone-300 rounded p-2 bg-white shadow-sm"
          />
          <button
            onClick={handleUploadPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-md transition"
          >
            📤 Upload PDF
          </button>
          {uploadMsg && <p className="text-sm text-green-700">{uploadMsg}</p>}
        </div>

        {/* Goal Selector */}
        {readyToTransform && (
          <div className="flex flex-wrap items-center gap-4">
            <label className="font-semibold text-stone-800">
              🎯 Select Transformation Goal:
            </label>
            <select
              className="p-2 border border-stone-300 rounded-lg bg-white shadow-sm"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="healthy">Healthy</option>
              <option value="fusion">Fusion</option>
              <option value="story">Story</option>
            </select>
            <button
              onClick={handleTransform}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full shadow-md transition"
            >
              🔄 Transform
            </button>
          </div>
        )}

        {/* Output */}
        {transformed && (
          <div className="bg-stone-50 p-5 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-lime-700 mb-2">
              🍽 Transformed Output
            </h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-stone-800">
              {transformed}
            </pre>
          </div>
        )}
      </div>
    </motion.div>
  );
}
