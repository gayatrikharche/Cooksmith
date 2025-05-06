import re
import json
from typing import Dict

def parse_recipe_text(text: str) -> Dict:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    
    result = {
        "title": "",
        "servings": "",
        "prep_time": "",
        "ingredients": [],
        "instructions": [],
        "nutrition_facts": {},
        "notes": [],
        "variations": [],
        "recommended_pairings": []
    }

    # Extract title
    for i, line in enumerate(lines):
        if "salad" in line.lower():
            result["title"] = line
            break

    # Extract servings and prep time
    for line in lines:
        if "makes" in line.lower():
            result["servings"] = line.split(":")[-1].strip()
        if "prep time" in line.lower():
            result["prep_time"] = line.split(":")[-1].strip()

    # Extract ingredients
    ing_start = lines.index("Ingredients") + 1 if "Ingredients" in lines else -1
    dir_start = lines.index("Directions") if "Directions" in lines else -1
    if ing_start > -1 and dir_start > -1:
        result["ingredients"] = lines[ing_start:dir_start]

    # Extract instructions
    if dir_start > -1:
        result["instructions"] = [line for line in lines[dir_start + 1:] if re.match(r"^\d+\.\s", line)]

    # Extract nutrition facts with calories fix
    nutrition = {}
    calorie_flag = False

    for line in lines:
        if "Amount per serving" in line:
            calorie_flag = True
            continue
        if calorie_flag:
            match = re.search(r"(\d+)", line)
            if match:
                nutrition["calories_per_serving"] = int(match.group(1))
            calorie_flag = False

        if "Total Fat" in line:
            nutrition["total_fat"] = line.split("Total Fat")[-1].strip()
        if "Saturated Fat" in line:
            nutrition["saturated_fat"] = line.split("Saturated Fat")[-1].strip()
        if "Trans Fat" in line:
            nutrition["trans_fat"] = line.split("Trans Fat")[-1].strip()
        if "Cholesterol" in line:
            nutrition["cholesterol"] = line.split("Cholesterol")[-1].strip()
        if "Sodium" in line:
            nutrition["sodium"] = line.split("Sodium")[-1].strip()
        if "Total Carbohydrate" in line:
            nutrition["total_carbohydrate"] = line.split("Total Carbohydrate")[-1].strip()
        if "Dietary Fiber" in line:
            nutrition["dietary_fiber"] = line.split("Dietary Fiber")[-1].strip()
        if "Total Sugars" in line:
            nutrition["total_sugars"] = line.split("Total Sugars")[-1].strip()
        if "Includes" in line and "Added Sugars" in line:
            nutrition["added_sugars"] = line.split("Includes")[-1].split("Added Sugars")[0].strip()
        if "Protein" in line:
            nutrition["protein"] = line.split("Protein")[-1].strip()
        if "Vitamin D" in line:
            nutrition["vitamin_d"] = line.split("Vitamin D")[-1].strip()
        if "Calcium" in line:
            nutrition["calcium"] = line.split("Calcium")[-1].strip()
        if "Iron" in line:
            nutrition["iron"] = line.split("Iron")[-1].strip()
        if "Vitamin A" in line:
            nutrition["vitamin_a"] = line.split("Vitamin A")[-1].strip()
        if "Potassium" in line:
            nutrition["potassium"] = line.split("Potassium")[-1].strip()
        if "Vitamin C" in line:
            nutrition["vitamin_c"] = line.split("Vitamin C")[-1].strip()
        if "Serving size" in line or "serving size" in line:
            nutrition["serving_size"] = line.split("size")[-1].strip()

    result["nutrition_facts"] = nutrition

    # Notes
    note_lines = [line for line in lines if "Note" in line or "Tips" in line]
    result["notes"] = note_lines

    # Variations
    result["variations"] = [line for line in lines if "Variation" in line or "Try" in line or "Make it a meal" in line]

    # Pairings
    result["recommended_pairings"] = [line for line in lines if "✪" in line]

    return result

