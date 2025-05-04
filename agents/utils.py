import zipfile
import os
import fitz  # PyMuPDF

def unzip_recipes(zip_path: str, extract_to: str = "data/raw/") -> None:
    os.makedirs(extract_to, exist_ok=True)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)
    print(f"Unzipped files to {extract_to}")

def extract_text_from_pdfs(raw_dir: str = "data/raw/", out_dir: str = "data/parsed/") -> None:
    os.makedirs(out_dir, exist_ok=True)
    for root, _, files in os.walk(raw_dir):
        for filename in files:
            if filename.endswith(".pdf"):
                pdf_path = os.path.join(root, filename)
                txt_path = os.path.join(out_dir, filename.replace(".pdf", ".txt"))
                with fitz.open(pdf_path) as doc:
                    text = "".join(page.get_text() for page in doc)
                with open(txt_path, "w", encoding="utf-8") as f:
                    f.write(text)
                print(f"Extracted: {filename} → {txt_path}")

def load_recipe(file_path: str) -> str:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "File not found."
