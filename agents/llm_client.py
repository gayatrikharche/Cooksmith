# agents/llm_client.py

import os
import google.generativeai as genai
from dotenv import load_dotenv

# API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-1.5-pro")

def call_llm(prompt: str) -> str:
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f" Error from LLM: {e}"
