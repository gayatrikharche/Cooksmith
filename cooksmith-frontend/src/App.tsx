// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import History from "./pages/History";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-lime-100 text-gray-800 font-sans">
        <nav className="bg-white shadow px-6 py-4 mb-8">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-lime-700">Cooksmith 🍳</h1>
            <div className="space-x-6 text-lg">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/explore" className="hover:underline">Explore</Link>
              <Link to="/history" className="hover:underline">History</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6">
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
