# Cooksmith

**Cooksmith** is an AI-powered culinary agent that transforms recipes using multi-step LLM workflows. Inspired by Anthropic's agentic design patterns, Cooksmith routes recipes through specialized agents like health optimizers, cultural remixers, and narrative storytellers — and evaluates or refines them to meet user-defined goals.

---

## 🔧 Features

- 🧾 **Recipe Ingestion**: Load raw recipe files (txt, json, etc.)
- 🧠 **Agentic Pipeline**: Multi-agent LLM workflows for recipe transformation
- 💬 **Frontend Interface**: View original and transformed recipes, ask interactive questions
- 🔁 **Evaluator Loop**: Improve recipes automatically via feedback

---

## 📁 Project Structure

agents - Router, optimizer, storyteller, evaluator agents
data - Raw recipe files
outputs - Transformed results
frontend - Frontend (Streamlit or React)
app.py - Main backend logic
README.md
.gitignore
