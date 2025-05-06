from agents.llm_client import call_llm

def route_recipe(recipe_text: dict, goal: str) -> str:
    goal = goal.strip().lower()
    formatted_text = format_recipe_dict(recipe_text)

    if goal == "healthy":
        return _health_optimizer(formatted_text)
    elif goal == "story":
        return _storyteller(formatted_text)
    elif goal == "fusion":
        return _fusion_transformer(formatted_text)
    else:
        return f"Unsupported goal: '{goal}'. Please choose from: healthy, story, or fusion."

def _health_optimizer(recipe: str) -> str:
    prompt = (
        "You are a nutritionist chef. Rewrite this recipe to be healthier. "
        "Replace unhealthy ingredients, reduce sugar, sodium, or fats, and suggest alternatives. "
        "At the end, summarize what changes were made in bullet points.\n\n"
        f"{recipe}"
    )
    return call_llm(prompt)

def _storyteller(recipe: str) -> str:
    prompt = (
        "You are a whimsical fantasy storyteller chef. Turn this recipe into a short magical fairytale. "
        "Be creative and poetic.\n\n"
        f"{recipe}"
    )
    return call_llm(prompt)

def _fusion_transformer(recipe: str) -> str:
    prompt = (
        "You are a global chef. Rewrite this recipe by infusing it with a second cuisine style "
        "(e.g., Korean, Indian, or Mexican). Replace ingredients and explain the fusion in a paragraph.\n\n"
        f"{recipe}"
    )
    return call_llm(prompt)

def format_recipe_dict(recipe: dict) -> str:
    output = []

    if title := recipe.get("title"):
        output.append(f"🍽 Title: {title}")

    if servings := recipe.get("servings"):
        output.append(f"🥣 Servings: {servings}")

    if prep := recipe.get("prep_time"):
        output.append(f"⏱ Prep Time: {prep}")

    if ingredients := recipe.get("ingredients"):
        output.append("\n🧂 Ingredients:")
        output.extend([f"- {ing}" for ing in ingredients])

    if instructions := recipe.get("instructions"):
        output.append("\n👩‍🍳 Instructions:")
        output.extend([f"{step}" for step in instructions])

    if nutrition := recipe.get("nutrition_facts"):
        output.append("\n🍎 Nutrition Facts:")
        for k, v in nutrition.items():
            output.append(f"{k.replace('_', ' ').capitalize()}: {v}")

    if variations := recipe.get("variations"):
        output.append("\n✨ Variations:")
        output.extend([f"- {v}" for v in variations])

    if notes := recipe.get("notes"):
        output.append("\n📝 Notes:")
        output.extend([f"- {n}" for n in notes])

    if pairings := recipe.get("recommended_pairings"):
        output.append("\n🥗 Recommended Pairings:")
        output.extend([f"- {p}" for p in pairings])

    return "\n".join(output)
