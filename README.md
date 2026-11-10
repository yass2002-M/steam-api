# Backend Fil Rouge

API REST de gestion de jeux vidéo, construite avec Node.js, Express et MongoDB.

## Prérequis

- Node.js et npm
- Une instance MongoDB accessible par l’application

## Installation

Depuis la racine du projet, installez les dépendances :

```bash
npm install
```

Créez un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/fil-rouge
```

Remplacez l’URI par celle de votre instance MongoDB si nécessaire. Le serveur attend la connexion à MongoDB avant d’écouter sur le port configuré.

## Démarrage

```bash
node index.js
```

Le serveur affiche l’adresse locale quand il démarre correctement. La variable `PORT` doit être définie dans `.env`.

## API

La ressource des jeux est préfixée par `/api/games`. Les requêtes avec un corps doivent envoyer du JSON (`Content-Type: application/json`).

| Méthode | URL | Description |
| --- | --- | --- |
| `GET` | `/health` | Vérifie que le serveur répond. |
| `GET` | `/api/games?page=0` | Récupère une page de jeux (10 jeux maximum). |
| `GET` | `/api/games/:id` | Récupère un jeu par son identifiant numérique. |
| `POST` | `/api/games` | Ajoute un jeu. |
| `PATCH` | `/api/games/:id` | Modifie les champs fournis pour un jeu. |
| `DELETE` | `/api/games/:id` | Supprime un jeu. |

### Vérification du serveur

```http
GET /health
```

Exemple de réponse :

```json
{
  "status": "ok",
  "uptime": 12.34,
  "timestamp": "11/10/2026"
}
```

### Liste paginée

```http
GET /api/games?page=0
```

Le paramètre `page` vaut `1` par défaut. Chaque résultat contient le numéro de page, le nombre de jeux renvoyés et le tableau `games` :

```json
{
  "page": 0,
  "count": 1,
  "games": [
    {
      "_id": 123,
      "title": "Exemple de jeu",
      "required_age": 0,
      "is_free": false
    }
  ]
}
```

La pagination utilise actuellement un décalage égal à `page × 10`. La page `0` renvoie donc les dix premiers jeux ; la page par défaut (`1`) commence au jeu suivant ce premier lot.

### Obtenir un jeu

```http
GET /api/games/123
```

### Ajouter un jeu

Les champs `_id` (numérique) et `title` sont obligatoires. Les autres champs sont facultatifs.

```http
POST /api/games
Content-Type: application/json

{
  "_id": 123,
  "title": "Exemple de jeu",
  "required_age": 0,
  "is_free": false,
  "description": "Description du jeu",
  "image": "https://example.com/image.jpg",
  "website": "https://example.com",
  "developers": ["Studio Exemple"],
  "publishers": ["Éditeur Exemple"],
  "platforms": ["Windows"],
  "metacritic_score": 80,
  "categories": [{ "id": 1, "description": "Single-player" }],
  "genres": [{ "id": 2, "description": "Action" }],
  "recommendations": 100,
  "release_date": "2026-01-01",
  "release_year": 2026
}
```

### Modifier un jeu

Envoyez uniquement les champs à modifier :

```http
PATCH /api/games/123
Content-Type: application/json

{
  "is_free": true
}
```

## Modèle de données

Les documents sont stockés dans la collection MongoDB `filRougeCollection`. Le modèle comprend notamment un identifiant numérique `_id`, un titre, des informations de sortie, les plateformes, développeurs et éditeurs, ainsi que les catégories et genres.

## Tests

Aucune suite de tests n’est configurée pour le moment. La commande `npm test` est un script placeholder qui échoue intentionnellement.