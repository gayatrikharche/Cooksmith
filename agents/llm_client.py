# agents/llm_client.py

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# Initialize Gemini Pro model
model = genai.GenerativeModel("gemini-pro")

def call_llm(prompt: str) -> str:
    """
    Calls Gemini Pro with the provided prompt and returns the generated response.
    """
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f" Error from LLM: {e}"
