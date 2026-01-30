import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY", "")

if not API_KEY:
    print("ERREUR: GEMINI_API_KEY non trouvée dans le .env")
    exit(1)

# Lister tous les modèles disponibles
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"

response = requests.get(url)
print(f"Status: {response.status_code}\n")

if response.status_code == 200:
    data = response.json()
    print("Modèles disponibles:")
    for model in data.get("models", []):
        print(f"  - {model['name']}")
        print(f"    Display name: {model.get('displayName', 'N/A')}")
        print(f"    Supported methods: {model.get('supportedGenerationMethods', [])}")
        print()
else:
    print(f"Erreur: {response.text}")
