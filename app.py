# app.py

import os
from agents.utils import unzip_recipes, extract_text_from_pdfs, load_recipe
from agents.router_agent import route_recipe

def main():
    print("👩‍🍳 Welcome to Cooksmith!")

    # Step 1: Unzip the recipe PDFs
    zip_path = "data/recipes_data.zip"
    unzip_recipes(zip_path)

    # Step 2: Extract text from PDFs
    extract_text_from_pdfs()

    # Step 3: Let user select a recipe from parsed .txt files
    parsed_dir = "data/parsed"
    txt_files = [f for f in os.listdir(parsed_dir) if f.endswith(".txt")]
    if not txt_files:
        print("⚠️ No .txt recipes found. Make sure PDFs were extracted correctly.")
        return

    print("\n📜 Available Recipes:")
    for i, fname in enumerate(txt_files):
        print(f"{i + 1}. {fname}")

    choice = int(input("\n🔢 Select a recipe number to transform: ")) - 1
    selected_file = txt_files[choice]
    recipe_path = os.path.join(parsed_dir, selected_file)
    recipe_text = load_recipe(recipe_path)

    print("\n📄 Recipe Preview:\n")
    print(recipe_text[:500] + "\n...\n")  # Show first 500 chars

    # Step 4: Ask user for transformation goal
    goal = input("🎯 Choose transformation (healthy / story / fusion): ").strip().lower()

    # Step 5: Route through appropriate agent
    transformed = route_recipe(recipe_text, goal)

    # Step 6: Save the transformed recipe
    output_file = f"{goal}_{selected_file}"
    output_path = os.path.join("outputs", output_file)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(transformed)

    print(f"\n✅ Transformed recipe saved to: {output_path}")

if __name__ == "__main__":
    main()
