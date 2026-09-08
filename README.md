# HashCode Sessions

## Des sessions qui se vivent

**HashCode Sessions** est une plateforme conçue pour organiser et enrichir les sessions technologiques, ateliers, masterclasses et expériences d'apprentissage de la communauté HashCode.

Le projet combine une présentation immersive, une participation mobile et des interactions en temps réel.

> **Google Meet réunit les participants. HashCode Sessions rend la session interactive.**

---

## Vision

Une session HashCode ne doit pas être une présentation passive.

L'objectif est de créer une expérience où les participants peuvent :

- suivre la session sur Google Meet ;
- participer depuis leur téléphone ;
- répondre à des questions ;
- voter en direct ;
- envoyer des réactions ;
- poser des questions ;
- prendre des notes ;
- donner leur feedback.

---

## Architecture de l'expérience

```text
                    GOOGLE MEET
              ┌────────────────────┐
              │ 🎤 Présentateur     │
              │ 🖥️ Présentation     │
              │ 👥 Participants     │
              └─────────┬──────────┘
                        │
                        │ partage d'écran
                        ▼
                HASHCODE SESSIONS
                Présentation HTML
                + interactions
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
    🎤 ADMIN / PRÉSENTATEUR      📱 PARTICIPANTS
          │                           │
          └─────────────┬─────────────┘
                        ▼
                 SUPABASE REALTIME
```

### Principe

- **Google Meet = la salle**
- **Présentation = l'immersion**
- **HashCode Sessions = la participation**

Le Companion ne doit pas distraire les participants. Il affiche uniquement les interactions utiles au bon moment.

---

# Stack technique

## Frontend

- Next.js
- React
- TypeScript
- CSS

## Backend et temps réel

- Supabase
- Supabase Realtime

## Hébergement

- Vercel

## Domaine

```text
session.joinhashcode.com
```

---

# Routes

## Public

### Accueil

```text
/
```

### Session publique

```text
/s/[sessionSlug]
```

Exemple :

```text
/s/session-01
```

### Rejoindre une session

```text
/join/[sessionCode]
```

Exemple :

```text
/join/session-01
```

Le participant entre simplement son prénom ou son pseudo.

### Session participant

```text
/live/[sessionCode]
```

C'est l'espace utilisé pendant la session.

---

# Administration

L'administration est séparée du public.

## Connexion

```text
/admin/login
```

## Tableau de contrôle

```text
/admin
```

## Vue présentateur

```text
/admin/presenter/[sessionCode]
```

Exemple :

```text
/admin/presenter/session-01
```

---

# Sécurité de l'administration

L'accès administrateur est protégé par un mot de passe défini côté serveur.

Flux :

```text
ADMIN
  ↓
/admin/login
  ↓
Mot de passe
  ↓
Vérification côté serveur
  ↓
Cookie HttpOnly sécurisé
  ↓
/admin
```

## Règles importantes

Ne jamais utiliser :

```text
NEXT_PUBLIC_ADMIN_PASSWORD
```

Le mot de passe est une variable serveur :

```env
ADMIN_PASSWORD=...
```

Il n'est jamais exposé au navigateur.

---

# Variables d'environnement

Créer un fichier :

```text
.env.local
```

à la racine du projet.

Structure :

```text
hashcode-sessions/
├── .env.local
├── .env.example
├── package.json
├── app/
├── components/
├── lib/
└── public/
```

## Variables publiques Supabase

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Ces variables peuvent être utilisées par l'application cliente.

## Variable privée d'administration

```env
ADMIN_PASSWORD=
```

## Secrets serveur

Ces variables ne doivent jamais être exposées dans le frontend :

```env
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_JWT_SECRET=
DATABASE_URL=
POSTGRES_PASSWORD=
```

---

# Installation locale

## 1. Cloner le repository

```bash
git clone https://github.com/digitaleflex/hashcode-learning-experiences.git
cd hashcode-learning-experiences
```

> Le nom GitHub actuel peut évoluer vers `hashcode-sessions`.

## 2. Installer les dépendances

```bash
npm install
```

## 3. Créer les variables d'environnement

Copier :

```text
.env.example
```

vers :

```text
.env.local
```

Puis renseigner les valeurs.

## 4. Démarrer le projet

```bash
npm run dev
```

Ouvrir :

```text
http://localhost:3000
```

---

# Commandes disponibles

## Développement

```bash
npm run dev
```

## Production

```bash
npm run build
```

## Démarrer la version de production

```bash
npm run start
```

## Vérification du code

```bash
npm run lint
```

---

# Modèle de participation

## Avant la session

Le participant reçoit :

```text
session.joinhashcode.com/join/session-01
```

Il peut recevoir ce lien :

- dans Google Meet ;
- dans le chat ;
- via WhatsApp ;
- via un QR Code affiché pendant la présentation.

## Pendant la session

Le participant conserve :

### Google Meet

Pour :

- suivre le présentateur ;
- écouter ;
- voir la présentation ;
- participer oralement.

### HashCode Sessions

Pour :

- voter ;
- répondre ;
- réagir ;
- poser des questions ;
- prendre des notes.

---

# Interactions prévues

Le système évoluera vers plusieurs types d'interactions.

## Votes

```text
PRÉSENTATEUR
      ↓
Ouvre un vote
      ↓
PARTICIPANTS
      ↓
Répondent depuis leur téléphone
      ↓
SUPABASE REALTIME
      ↓
PRÉSENTATEUR
      ↓
Voit les résultats
      ↓
RÉVÉLATION
```

## Questions

Les participants peuvent envoyer des questions pendant la session.

## Réactions

Exemples :

- 💡 Idée
- 🤯 Surprise
- ❓ À approfondir
- ⚠️ Pas convaincu

## Carnet personnel

Chaque participant peut conserver ses notes et apprentissages.

## Feedback final

À la fin d'une session, les participants pourront donner leur retour.

---

# Supabase : modèle de données cible

Les premières entités prévues sont :

```text
sessions
participants
interactions
responses
questions
notes
feedback
```

## Flux initial

Le premier flux temps réel à construire sera :

```text
Participant rejoint
        ↓
Participant enregistré
        ↓
Présentateur voit le participant
```

Puis :

```text
Présentateur ouvre une interaction
        ↓
Les participants la reçoivent
        ↓
Ils répondent
        ↓
Les résultats arrivent en temps réel
```

---

# Déploiement

Le projet est destiné à être déployé sur **Vercel**.

## Variables Vercel

Configurer :

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
ADMIN_PASSWORD
```

Les autres secrets éventuels restent des variables serveur.

## Domaine

Le domaine cible est :

```text
session.joinhashcode.com
```

---

# Session 01

## Thème

# LE TRAVAIL CHANGE.

Sous-titre :

> De l'utilisateur d'IA à l'architecte d'un système intelligent.

La Session 01 constitue la première expérience construite sur HashCode Sessions.

Elle servira également de référence pour concevoir les futures sessions.

---

# Roadmap

## Phase 1 — Fondation

- [x] Migration vers Next.js
- [x] Branding HashCode Sessions
- [x] Routes publiques
- [x] Zone administration
- [x] Protection par mot de passe serveur
- [x] Structure Supabase client
- [ ] Validation complète du build local

## Phase 2 — Supabase

- [ ] Créer les tables
- [ ] Configurer les politiques RLS
- [ ] Enregistrer les sessions
- [ ] Enregistrer les participants
- [ ] Connecter Supabase Realtime

## Phase 3 — Interactions

- [ ] Votes en direct
- [ ] Réactions
- [ ] Questions
- [ ] Résultats temps réel
- [ ] Contrôle présentateur

## Phase 4 — Expérience présentateur

- [ ] Tableau de contrôle complet
- [ ] Ouvrir une interaction
- [ ] Fermer une interaction
- [ ] Révéler les résultats
- [ ] Suivi des participants

## Phase 5 — Session 01

- [ ] Migration complète de la présentation
- [ ] Intégration des interactions
- [ ] Notes présentateur
- [ ] Vue présentateur
- [ ] Tests complets avant la session

## Phase 6 — Déploiement

- [ ] Déployer sur Vercel
- [ ] Configurer le domaine
- [ ] Tester sur mobile
- [ ] Tester avec plusieurs participants
- [ ] Répétition complète de la session

---

# Philosophie du projet

HashCode Sessions ne cherche pas à remplacer Google Meet.

Google Meet résout déjà :

- la visioconférence ;
- l'audio ;
- la vidéo ;
- la réunion des participants.

HashCode Sessions apporte ce qui manque :

> **Une couche d'interaction, d'immersion et de participation.**

---

## Objectif final

Construire une plateforme universelle capable de supporter :

- Sessions HashCode ;
- ateliers ;
- workshops ;
- masterclasses ;
- formations ;
- démonstrations technologiques ;
- événements communautaires.

**Une session ne doit pas seulement être regardée. Elle doit être vécue.**
