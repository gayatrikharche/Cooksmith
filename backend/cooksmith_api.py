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

@app.post("/upload")
def upload_pdf(file: UploadFile):
    os.makedirs("data/raw", exist_ok=True)
    pdf_path = f"data/raw/{file.filename}"

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    from agents.utils import extract_text_from_pdf  # make sure this is imported
    extract_text_from_pdf(pdf_path)

    return {"message": "✅ PDF uploaded and parsed successfully."}


# --- Transform a Recipe ---
@app.post("/transform_explain")
def transform_recipe(recipe_text: str = Form(...), goal: str = Form(...)):
    result = route_recipe(recipe_text, goal)
    
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

# --- Ask a Question ---
@app.post("/ask")
def ask_question(recipe_json: str = Form(...), question: str = Form(...)):
    prompt = (
        "You are a helpful AI chef. Use the structured recipe data below to answer the user's question.\n\n"
        f"RECIPE DATA:\n{recipe_json}\n\n"
        f"QUESTION:\n{question}"
    )
    answer = call_llm(prompt)

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

# --- Get All Transformed Recipes ---
@app.get("/recipes")
def get_all_transformed():
    db = SessionLocal()
    results = db.query(TransformedRecipe).all()
    db.close()
    return [
        {
            "id": r.id,
            "original_name": r.original_name,
            "goal": r.goal,
            "transformed_text": r.transformed_text
        }
        for r in results
    ]

# --- Get All Q&A Records ---
@app.get("/questions")
def get_all_questions():
    db = SessionLocal()
    results = db.query(RecipeQnA).all()
    db.close()
    return [
        {
            "id": q.id,
            "question": q.question,
            "answer": q.answer,
            "recipe_json": q.recipe_json
        }
        for q in results
    ]
