import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY", "")
# Utiliser gemini-2.5-flash (version la plus récente et performante)
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

if not API_KEY:
    print("ERREUR: GEMINI_API_KEY non trouvée dans le .env")
    exit(1)

payload = {
    "contents": [
        {
            "parts": [
                {"text": "Bonjour"}
            ]
        }
    ],
    "generationConfig": {
        "temperature": 0.7,
        "maxOutputTokens": 300
    }
}

headers = {
    "Content-Type": "application/json",
    "X-goog-api-key": API_KEY
}

print(f"URL: {GEMINI_URL}")
print(f"Headers: {headers}")
print(f"Payload: {json.dumps(payload, indent=2)}")

response = requests.post(GEMINI_URL, json=payload, headers=headers)

print(f"\nStatus Code: {response.status_code}")
print(f"Response Text:\n{response.text}")
try:
    json_response = response.json()
    print(f"\nJSON Response:\n{json.dumps(json_response, indent=2)}")
    
    # Afficher le message d'erreur s'il existe
    if "error" in json_response:
        print(f"\nERREUR DÉTAILLÉE: {json_response['error']}")
except:
    print("Impossible de parser JSON")
