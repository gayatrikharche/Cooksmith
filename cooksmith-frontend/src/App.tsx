// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import History from "./pages/History";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-tr from-stone-100 via-amber-50 to-lime-100 text-stone-800 font-sans">
        <nav className="bg-white/80 backdrop-blur shadow-md px-6 py-4 mb-10 rounded-b-xl">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-amber-600"> Cooksmith</h1>
            <div className="space-x-6 text-lg">
              <Link to="/" className="text-stone-700 hover:text-amber-600 transition">Home</Link>
              <Link to="/explore" className="text-stone-700 hover:text-amber-600 transition">Explore</Link>
              <Link to="/history" className="text-stone-700 hover:text-amber-600 transition">History</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
