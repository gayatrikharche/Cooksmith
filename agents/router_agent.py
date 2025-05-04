from agents.llm_client import call_llm

def route_recipe(recipe_text: str, goal: str) -> str:
    goal = goal.strip().lower()
    if goal == "healthy":
        return _health_optimizer(recipe_text)
    elif goal == "story":
        return _storyteller(recipe_text)
    elif goal == "fusion":
        return _fusion_transformer(recipe_text)
    else:
        return f" Unsupported goal: '{goal}'. Please choose from: healthy, story, or fusion."

def _health_optimizer(recipe: str) -> str:
    prompt = (
        "You are a nutritionist chef. Rewrite this recipe to be healthier. "
        "Replace unhealthy ingredients, reduce sugar/sodium/fats, and suggest alternatives. "
        "At the end, summarize what changes were made.\n\n"
        f"Original Recipe:\n{recipe}"
    )
    return call_llm(prompt)

def _storyteller(recipe: str) -> str:
    prompt = (
        "You are a whimsical fantasy storyteller chef. Turn this recipe into a short fairytale. "
        "Be creative, poetic, and magical.\n\n"
        f"Recipe:\n{recipe}"
    )
    return call_llm(prompt)

def _fusion_transformer(recipe: str) -> str:
    prompt = (
        "You are a global chef. Remix this recipe by fusing it with another cuisine (e.g., Korean, Indian, Mexican). "
        "Replace ingredients where needed and explain the culinary fusion.\n\n"
        f"Original Recipe:\n{recipe}"
    )
    return call_llm(prompt)
