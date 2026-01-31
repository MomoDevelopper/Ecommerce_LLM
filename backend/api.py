from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ==== CORS ====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # pour dev local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==== Gemini config ====
import os
API_KEY = os.getenv("GEMINI_API_KEY", "")  # À mettre en variable d'environnement
# Utiliser gemini-2.5-flash qui est disponible et performant
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

class Product(BaseModel):
    product: str

@app.get("/")
def root():
    return {"status": "backend running"}

@app.post("/generate")
def generate(product: Product):
    if not API_KEY:
        return {"result": "Erreur: Clé API non configurée", "raw_gemini": {}}
    
    prompt = f"""You are an expert e-commerce copywriter specializing in creating high-converting product descriptions.

Generate a comprehensive, persuasive product description for: **{product.product}**

IMPORTANT: Generate ONLY the content (400-500 words minimum), NO section numbers or labels like "1.", "2.", "## TITLE", etc. Just natural flowing content with:

- A compelling hook sentence that makes people want to buy
- Clear, benefit-focused description of what the product is
- Key technical specifications and materials
- 8-10 main features and benefits as bullet points
- Specific use cases and scenarios where this product excels
- Why customers should choose this product over alternatives
- Realistic technical details (dimensions, materials, warranty, etc.)
- Tangible customer benefits and how it improves their life
- Professional guarantee, warranty and support information
- 2-3 compelling calls-to-action

Use persuasive, benefit-focused language. Be specific and avoid generic phrases. Create urgency where appropriate. Focus on customer transformation.

Just write the content naturally - let it flow without section headings or numbers."""

    # Payload correct pour Gemini API
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.8,
            "maxOutputTokens": 1500
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    # L'API key doit être dans l'URL, pas dans le header
    url_with_key = f"{GEMINI_URL}?key={API_KEY}"
    
    try:
        response = requests.post(url_with_key, json=payload, headers=headers, timeout=30)
        
        # Afficher la réponse même en cas d'erreur
        print(f"Status Code: {response.status_code}")
        
        response.raise_for_status()  # Vérifie les erreurs HTTP
        data = response.json()
        
        # Parser le texte généré
        if "candidates" in data and len(data["candidates"]) > 0:
            candidate = data["candidates"][0]
            if "content" in candidate and "parts" in candidate["content"]:
                parts = candidate["content"]["parts"]
                if len(parts) > 0 and "text" in parts[0]:
                    text = parts[0]["text"]
                    if text.strip():
                        return {"result": text, "raw_gemini": data}
        
        return {"result": "Gemini n'a rien retourné", "raw_gemini": data}
    
    except requests.exceptions.RequestException as e:
        error_msg = f"Erreur API: {str(e)}"
        print(error_msg)
        return {"result": error_msg, "raw_gemini": {}}
    except Exception as e:
        error_msg = f"Erreur parsing: {str(e)}"
        print(error_msg)
        return {"result": error_msg, "raw_gemini": {}}
