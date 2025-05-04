# cooksmith-backend/cooksmith_api.py

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from agents.utils import unzip_recipes, extract_text_from_pdfs
from agents.router_agent import route_recipe
from agents.llm_client import call_llm
from db import SessionLocal, TransformedRecipe, RecipeQnA
import shutil

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. Upload a ZIP file of PDFs and process them ---
@app.post("/upload")
def upload_zip(file: UploadFile):
    zip_path = "data/recipes_data.zip"
    with open(zip_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    unzip_recipes(zip_path)
    extract_text_from_pdfs()
    return {"message": "✅ Uploaded and parsed successfully."}

# --- 2. Transform a recipe with explanation ---
@app.post("/transform_explain")
def transform_recipe(recipe_text: str = Form(...), goal: str = Form(...)):
    result = route_recipe(recipe_text, goal)
    
    # Save to database
    db = SessionLocal()
    db_obj = TransformedRecipe(
        original_name="user_paste",
        goal=goal,
        transformed_text=result
    )
    db.add(db_obj)
    db.commit()
    db.close()

    return {"transformed": result}

# --- 3. Ask a question about a structured recipe JSON ---
@app.post("/ask")
def ask_question(recipe_json: str = Form(...), question: str = Form(...)):
    prompt = (
        "You are a helpful AI chef. Use the structured recipe data below to answer the user's question.\n\n"
        f"RECIPE DATA:\n{recipe_json}\n\n"
        f"QUESTION:\n{question}"
    )
    answer = call_llm(prompt)

    # Save to database
    db = SessionLocal()
    db_obj = RecipeQnA(
        question=question,
        answer=answer,
        recipe_json=recipe_json
    )
    db.add(db_obj)
    db.commit()
    db.close()

    return {"answer": answer}
