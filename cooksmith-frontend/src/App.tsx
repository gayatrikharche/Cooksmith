// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Help from "./pages/Help"; 

export default function App() {
  return (
    <Router>
      <div
        className="min-h-screen font-sans text-stone-800"
        style={{
          backgroundImage: "url('/bg-pattern5.jpg')",
          backgroundSize: "30%",
          backgroundAttachment: "fixed",
        }}
      >
        <nav className="bg-white/80 backdrop-blur shadow-md px-6 py-4 mb-10 rounded-b-xl">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-amber-600"> Cooksmith</h1>
            <div className="space-x-6 text-lg">
              <Link to="/" className="text-stone-700 hover:text-amber-600 transition">Home</Link>
              <Link to="/explore" className="text-stone-700 hover:text-amber-600 transition">Explore</Link>
              <Link to="/history" className="text-stone-700 hover:text-amber-600 transition">History</Link>
              <Link to="/help" className="text-stone-700 hover:text-amber-600 transition">Help</Link> {/* ✅ Add Help */}
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 pb-12">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/history" element={<History />} />
              <Route path="/help" element={<Help />} /> {/* ✅ Add Help Route */}
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}
