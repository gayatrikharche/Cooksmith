from agents.llm_client import call_llm

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
