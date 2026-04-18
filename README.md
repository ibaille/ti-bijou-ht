# 👶 Ti Bijou Haïti v2.0 — Projet Final Production

## Installation
```bash
cd ti-bijou-ht
npm install
npm run dev
```
Ouvrir http://localhost:3000

## Admin
- URL: /admin
- Email: admin@tibijouht.com
- Mot de passe: TiBijou2026!
- Changez ces identifiants dans .env.local

## Déploiement
```bash
git init && git add . && git commit -m "v2.0"
git remote add origin https://github.com/VOTRE-NOM/ti-bijou-ht.git
git branch -M main && git push -u origin main
```
Puis importez sur vercel.com avec les variables d'environnement.

## Variables Vercel
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_WHATSAPP_NUMBER
- NEXT_PUBLIC_ADMIN_EMAIL
- NEXT_PUBLIC_ADMIN_PASSWORD
