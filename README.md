# Site de Cartographie Jekyll

Un site Jekyll pour cartographier et documenter vos lieux visités avec OpenStreetMap.

## Installation rapide

1. **Installer les dépendances**
   ```bash
   bundle install
   ```

2. **Lancer le serveur de développement**
   ```bash
   bundle exec jekyll serve
   ```

3. **Visiter le site**
   Ouvrez votre navigateur sur `http://localhost:4000`

## Ajouter un nouveau lieu

Créez un fichier dans `_places/` avec ce format :

```yaml
---
title: "Nom du lieu"
lat: 48.8566
lon: 2.3522
tags: ["tag1", "tag2"]
description: "Description courte"
image: "/images/photo.jpg"  # optionnel
---

Contenu en Markdown...
```

## Fonctionnalités

- 🗺️ Carte interactive OpenStreetMap
- 🔍 Recherche par nom
- 🏷️ Filtrage par tags
- 📱 Design responsive
- 🎨 Interface moderne

## Structure

```
├── _config.yml          # Configuration
├── Gemfile             # Dépendances
├── index.html          # Page avec carte
├── _layouts/           # Templates
├── _places/            # Vos lieux
├── images/             # Photos
└── README.md          # Documentation
```

Consultez les exemples dans `_places/` pour commencer !
