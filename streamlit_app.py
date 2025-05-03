import os
import streamlit as st
from agents.utils import unzip_recipes, extract_text_from_pdfs, load_recipe
from agents.router_agent import route_recipe

# Constants
ZIP_PATH = "data/recipes_data.zip"
RAW_DIR = "data/raw/"
PARSED_DIR = "data/parsed/"
OUTPUT_DIR = "outputs/"

# Ensure folders exist
os.makedirs("data", exist_ok=True)
os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(PARSED_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Page setup
st.set_page_config(page_title="Cooksmith", page_icon="🍳")
st.title("👩‍🍳 Cooksmith: Your AI Recipe Transformer")

# Upload section
st.header("📥 Upload Your Recipe Zip")
zip_file = st.file_uploader("Upload a .zip file containing recipe PDFs", type=["zip"])

if zip_file:
    with open(ZIP_PATH, "wb") as f:
        f.write(zip_file.read())

    unzip_recipes(ZIP_PATH)
    extract_text_from_pdfs()
    st.success("✅ Recipes extracted and parsed successfully!")

# Display parsed recipe files
txt_files = [f for f in os.listdir(PARSED_DIR) if f.endswith(".txt")]

if txt_files:
    st.header("📜 Select a Recipe")
    selected_file = st.selectbox("Choose a recipe to transform", txt_files)
    recipe_text = load_recipe(os.path.join(PARSED_DIR, selected_file))
    st.text_area("📝 Original Recipe", recipe_text, height=300)

    # Choose transformation goal
    st.header("🎯 Choose Transformation")
    goal = st.selectbox("Transformation type", ["healthy", "story", "fusion"])

    if st.button("🔁 Transform Recipe"):
        transformed = route_recipe(recipe_text, goal)

        # Save transformed output
        output_path = os.path.join(OUTPUT_DIR, f"{goal}_{selected_file}")
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(transformed)

        st.success(f"✅ Transformed recipe saved to: {output_path}")
        st.text_area("🍽️ Transformed Recipe", transformed, height=300)
