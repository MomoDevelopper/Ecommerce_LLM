<<<<<<< HEAD
# Ecommerce_LLM
=======
# Momo AI - E-commerce Product Description Generator

Une application LLM qui génère des descriptions de produits e-commerce automatiquement avec Gemini AI.

## Features

- 🤖 Génération automatique de descriptions avec Gemini 2.5 Flash
- 💬 Interface de chat moderne avec Next.js
- 🚀 Backend FastAPI performant
- 📱 Responsive design
- ⚡ Descriptions détaillées (400-500+ mots)

## Stack Tech

**Frontend:** Next.js 15, TypeScript, React
**Backend:** FastAPI, Python
**AI:** Google Gemini 2.5 Flash API

## Setup Local

### Backend

```bash
cd backend
pip install -r requirement.txt
```

Créer `.env`:
```
GEMINI_API_KEY=votre_clé_api
```

Lancer:
```bash
python -m uvicorn api:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Accéder à `http://localhost:3000`

## Déploiement

### Backend sur Render

1. Push ton code sur GitHub (si ce n'est pas fait)
2. Va sur [render.com](https://render.com)
3. Crée un nouveau "Web Service"
4. Connecte ton repo GitHub
5. Configure:
   - **Build Command:** `pip install -r requirement.txt`
   - **Start Command:** `gunicorn -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 api:app`
6. Ajoute la variable d'environnement:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Ta clé API Gemini
7. Deploy!

### Frontend sur Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Importe ton projet GitHub
3. Configure:
   - **Framework:** Next.js
   - **Root Directory:** `frontend`
4. Ajoute la variable d'environnement:
   - **Name:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** L'URL de ton backend Render (ex: `https://momo-ai-backend.onrender.com`)
5. Deploy!

## Variables d'Environnement

### Backend (.env)
```
GEMINI_API_KEY=ta_clé_api_ici
```

### Frontend (.env.local sur Vercel)
```
NEXT_PUBLIC_BACKEND_URL=https://ton-backend.onrender.com
```

## Usage

1. Écris le nom d'un produit (ex: "ordinateur", "téléphone", "chaise")
2. Clique sur "Envoyer" ou appuie sur Entrée
3. Momo AI génère une description détaillée et persuasive
4. Copie/colle dans ton site e-commerce!

## API Endpoints

### POST /generate
Génère une description pour un produit

**Request:**
```json
{
  "product": "ordinateur"
}
```

**Response:**
```json
{
  "result": "Description détaillée...",
  "raw_gemini": {}
}
```

## Notes

- La clé API Gemini doit être active et avoir les quotas disponibles
- Le backend prend environ 30-60s pour générer une description complète
- Les descriptions font entre 400-500+ mots
- Adapte le prompt dans `api.py` pour tes besoins spécifiques

## License

MIT
>>>>>>> 5234fbe (Initial commit - momo ai)
