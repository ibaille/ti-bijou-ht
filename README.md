# 👶 Ti Bijou Haïti

Boutique en ligne pour nouveau-nés en Haïti.

## 🚀 Installation Rapide

### Prérequis
- **Node.js v20+** → https://nodejs.org
- **Git** → https://git-scm.com
- **VS Code** (recommandé) → https://code.visualstudio.com

### Étape 1 : Installer les dépendances
```bash
cd ti-bijou-ht
npm install
```

### Étape 2 : Configurer l'environnement
Copiez `.env.local` et modifiez les valeurs :
```bash
cp .env.local .env.local.bak
```
> Pour tester sans Supabase, le site fonctionne avec les données de démo intégrées.

### Étape 3 : Lancer le site
```bash
npm run dev
```
Ouvrez **http://localhost:3000** dans votre navigateur.

## 📁 Structure du Projet

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx           # Accueil
│   ├── boutique/          # Catalogue avec filtres
│   ├── produit/[id]/      # Fiche produit détaillée
│   ├── a-propos/          # À propos
│   ├── contact/           # Formulaire de contact
│   ├── faq/               # Questions fréquentes
│   └── admin/             # Dashboard administrateur
│       ├── produits/      # Gestion CRUD produits
│       └── messages/      # Gestion des messages
├── components/            # Composants réutilisables
│   ├── layout/            # Navbar, Footer
│   ├── ui/                # Logo, ProductCard, SearchBar
│   └── product/           # InterestModal
└── lib/                   # Utilitaires
    ├── data.ts            # Données de démo (12 produits)
    ├── store.ts           # État global (Zustand)
    ├── supabase.ts        # Client Supabase
    ├── types.ts           # Types TypeScript
    └── utils.ts           # Fonctions utilitaires
```

## 🗄️ Base de Données (Supabase)

1. Créez un projet sur https://supabase.com (gratuit)
2. Exécutez `supabase-setup.sql` dans le SQL Editor
3. Mettez les clés dans `.env.local`

## 🌐 Déploiement

```bash
# Pousser sur GitHub
git init && git add . && git commit -m "v1.0"
git remote add origin https://github.com/VOTRE_NOM/ti-bijou-ht.git
git push -u origin main

# Puis connectez le repo à Vercel.com
```

## 🔑 Admin

Accédez à `/admin` pour le dashboard. En mode démo, entrez n'importe quel email/mot de passe.

## 📱 Fonctionnalités

- ✅ 6 pages complètes (Accueil, Boutique, Produit, À propos, FAQ, Contact)
- ✅ Dashboard admin (Stats, Produits CRUD, Messages)
- ✅ Bilingue Français / Créole haïtien
- ✅ Mobile-first responsive
- ✅ Recherche avec suggestions
- ✅ Filtres (catégorie, genre, âge, tri)
- ✅ Favoris
- ✅ Intégration WhatsApp
- ✅ Formulaire d'intérêt produit
- ✅ 12 produits de démo
- ✅ PWA ready
- ✅ Palette pastel douce
- ✅ Animations fluides

## 💰 Coût

| Composant | Coût |
|-----------|------|
| Code & Hébergement (Vercel) | Gratuit |
| Base de données (Supabase) | Gratuit |
| Domaine (.com) | ~12$/an |
| **Total** | **~12$/an** |
