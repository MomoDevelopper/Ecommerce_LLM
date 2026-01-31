# Guide de Déploiement - Momo AI

## 🚀 Déploiement Frontend sur Vercel

### Étape 1 : Créer un nouveau projet Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Cliquez sur **"Add New Project"** ou **"Import Project"**
3. Sélectionnez votre repository GitHub : `MomoDevelopper/Ecommerce_LLM`

### Étape 2 : Configuration du projet

Configurez les paramètres suivants :

- **Framework Preset** : `Next.js` (auto-détecté)
- **Root Directory** : `frontend`
- **Build Command** : `npm run build` (auto)
- **Output Directory** : `.next` (auto)
- **Install Command** : `npm install` (auto)

### Étape 3 : Variables d'environnement

Ajoutez la variable d'environnement suivante :

- **Name** : `NEXT_PUBLIC_BACKEND_URL`
- **Value** : `https://ecommerce-llm.onrender.com`

**Comment ajouter :**
1. Dans la page de configuration du projet, allez dans **"Environment Variables"**
2. Cliquez sur **"Add"**
3. Entrez le nom et la valeur ci-dessus
4. Sélectionnez tous les environnements (Production, Preview, Development)
5. Cliquez sur **"Save"**

### Étape 4 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez que le build se termine (environ 2-3 minutes)
3. Votre application sera disponible sur une URL Vercel (ex: `https://votre-projet.vercel.app`)

## 🔧 Déploiement Backend sur Render

### Configuration actuelle

- **URL du backend** : `https://ecommerce-llm.onrender.com`
- **Variable d'environnement requise** : `GEMINI_API_KEY`

### Vérifier le backend

Pour tester si le backend fonctionne :

```bash
curl https://ecommerce-llm.onrender.com/
```

Devrait retourner : `{"status":"backend running"}`

## ✅ Checklist de déploiement

- [ ] Repository GitHub à jour avec le dernier code
- [ ] Backend déployé sur Render avec la bonne clé API
- [ ] Variable `GEMINI_API_KEY` configurée sur Render
- [ ] Nouveau projet Vercel créé
- [ ] Variable `NEXT_PUBLIC_BACKEND_URL` configurée sur Vercel
- [ ] Déploiement réussi
- [ ] Test de l'application avec un produit (ex: "speakers")

## 🐛 Dépannage

### Erreur "Backend indisponible"
- Vérifiez que `NEXT_PUBLIC_BACKEND_URL` est bien configurée sur Vercel
- Vérifiez que le backend Render est en ligne
- Vérifiez les logs Render pour les erreurs

### Erreur 403/400 de l'API Gemini
- Vérifiez que `GEMINI_API_KEY` est correcte sur Render
- Vérifiez que le backend utilise le bon modèle (`gemini-2.0-flash`)
- Vérifiez que la clé API est dans le header `X-goog-api-key`

### Build échoue sur Vercel
- Vérifiez que `Root Directory` est bien `frontend`
- Vérifiez les logs de build sur Vercel
- Vérifiez que `package.json` contient le script `build`

## 📝 Notes importantes

- Le frontend nécessite `NEXT_PUBLIC_BACKEND_URL` pour fonctionner
- Le backend nécessite `GEMINI_API_KEY` pour fonctionner
- Les deux doivent être déployés et accessibles pour que l'application fonctionne complètement

