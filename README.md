# PEN - Plateforme d'Éducation à la Cybersécurité

**PEN** est une application web complète conçue pour rendre la cybersécurité simple, accessible et actionnable pour les particuliers, les étudiants et les PME au Cameroun et au-delà. La plateforme offre une suite d'outils et de ressources pour analyser les menaces, apprendre les bonnes pratiques et se protéger efficacement.

## ✨ Fonctionnalités Implémentées

*   **Nouvelle Animation d'Introduction :** À l'ouverture du site, une animation de style "Matrix" apparaît, avec des lignes vertes circulantes et un texte animé, clignotant et s'assemblant ("Bienvenue en 2026 - Bonne année !").
*   **Quiz sur la Cybersécurité :** Une nouvelle page `/quiz` offre un quiz interactif de 10 questions aléatoires, incluant des questions avec un contexte corporate/camerounais, et des animations pour les réponses.
*   **Logos Mis à Jour :** Le logo `pen.png` est correctement affiché dans la barre de navigation (Navbar) et le pied de page (Footer).
*   **Carte des Menaces du Cameroun :** La section des menaces en direct affiche désormais une carte du Cameroun, avec des données de menaces récupérées dynamiquement depuis Supabase.
*   **Tableau de Bord Administrateur Étendu :** L'interface admin inclut maintenant la gestion complète (ajout, modification, suppression) des Guides, Outils et Menaces.
*   **Pages Légales :** Les pages "Conditions d'Utilisation" (`/terms`) et "Politique de Confidentialité" (`/privacy`) sont implémentées, avec des liens actifs dans le pied de page.
*   **Accès au Quiz :** La page "Quiz" est accessible via un lien dans la barre de navigation principale.

## 🛠️ Stack Technologique

Ce projet est construit avec :

*   **Frontend :** React, Vite, TypeScript
*   **UI & Style :** Tailwind CSS, Shadcn UI, Framer Motion
*   **Visualisation 3D/Particules :** `@react-three/fiber`, `@react-three/drei`, `tsparticles`
*   **Cartographie :** `react-simple-maps`, `axios` pour GeoJSON
*   **Génération PDF :** `jspdf`
*   **Backend & Base de Données :** Supabase (PostgreSQL, Auth, Storage)
*   **Déploiement :** Netlify (alternativement, GitHub Actions pour GitHub Pages)

## 🚀 Comment l'utiliser (Localement)

1.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/Pentestero/-pen-security.git
    cd -pen-security
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    ```
3.  **Configurer Supabase :**
    *   Créez un projet sur Supabase (voir les instructions détaillées fournies précédemment par l'IA).
    *   Créez les tables `profiles`, `guides`, `tools`, `threats` dans votre éditeur SQL Supabase (remplacez `YOUR_ADMIN_EMAIL`).
    *   Créez les buckets de stockage `guides-files` et `tools-files` avec les politiques RLS appropriées.
4.  **Fichier d'environnement :**
    *   Créez un fichier `.env.local` à la racine du projet et ajoutez vos clés Supabase :
        ```
        VITE_SUPABASE_URL="VOTRE_URL_SUPABASE"
        VITE_SUPABASE_ANON_KEY="VOTRE_CLE_ANON_SUPABASE"
        ```
5.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```
    Ouvrez votre navigateur à `http://localhost:8080`.

## 🌐 Déploiement

Ce projet est configuré pour un déploiement facile sur Netlify :

1.  Connectez-vous à [Netlify](https://app.netlify.com/) avec votre compte GitHub.
2.  Importez votre dépôt `pen-security`.
3.  Configurez les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les paramètres de votre site Netlify (Build & deploy -> Environment).
4.  Netlify s'occupera du reste.

---

### ⚠️ Problèmes Actuels Connus

1.  **Tableau de Bord Administrateur - Onglets manquants :** Les sections "Gérer les Guides" et "Gérer les Outils" ne s'affichent plus leurs contenus dans le tableau de bord administrateur. Ce problème est en cours de résolution.
