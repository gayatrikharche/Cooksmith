import zipfile
import os
import json
import fitz  # PyMuPDF
from agents.parser import parse_recipe_text

def unzip_recipes(zip_path: str, extract_to: str = "data/raw/") -> None:
    os.makedirs(extract_to, exist_ok=True)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)
    print(f"Unzipped files to {extract_to}")

def extract_and_parse_single_pdf(pdf_path: str, output_json_path: str):
    with fitz.open(pdf_path) as doc:
        text = "".join(page.get_text() for page in doc)
        
#    print(text)

    parsed = parse_recipe_text(text)
    
#    print(parsed)

    os.makedirs(os.path.dirname(output_json_path), exist_ok=True)
    with open(output_json_path, "w", encoding="utf-8") as f:
        json.dump(parsed, f, indent=2)

    print(f"JSON saved to {output_json_path}")


def load_recipe(file_path: str) -> str:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "File not found."
