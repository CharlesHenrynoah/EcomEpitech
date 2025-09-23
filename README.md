# 🛠️ EcomEpitech Admin Panel

Back-office React pour la gestion e-commerce, construit avec **Vite**, **TypeScript**, **Tailwind CSS**, **Supabase**, et **shadcn-ui**.

---

## 🚀 Aperçu

Le back-office **Admin** est une application **Vite/React** en **TypeScript**, stylisée avec **Tailwind CSS** et la librairie **shadcn-ui**, et connectée à **Supabase** pour l’authentification et la persistance des données.

---

## 📁 Structure principale

src/
├── App.tsx # Routage principal et providers globaux
├── main.tsx # Point d’entrée de l’application
├── pages/ # Pages métiers (Dashboard, Produits, etc.)
├── components/ # Composants UI génériques
├── contexts/ # Contexts React (Auth, etc.)
├── hooks/ # Hooks métiers pour les appels Supabase
├── integrations/ # Client Supabase
├── types/ # Typage Supabase (via introspection DB)
├── lib/ # Fonctions utilitaires
└── index.css # Feuille de style principale

markdown
Copier le code

---

## 🧭 Point d’entrée & routage

- `main.tsx` : monte l’application React avec `createRoot`.
- `App.tsx` : gère l’arborescence des routes et providers (React Query, Auth, Sidebar...).
- `ProtectedLayout` : wrapper global avec redirection automatique vers `/auth` si l’utilisateur n’est pas connecté.

---

## 🔐 Authentification & permissions

- **`AuthContext`** :
  - Gère la session Supabase.
  - Récupère les métadonnées `users_gestion`.
  - Expose les fonctions `signIn`, `signUp`, `signOut`.
  - Partage l’état utilisateur dans toute l’application.

- **`ProtectedRoute`** & **`usePermissions`** :
  - Implémentent un contrôle d’accès basé sur les rôles (`admin`, `moderator`, `customer`).

---

## 🧩 Intégration Supabase & typage

- `integrations/supabase/client.ts` :
  - Initialise le client Supabase.

- `types/database.ts` :
  - Fournit le typage complet de la base (produits, commandes, clients...).
  - Inclut les filtres utilisés par les hooks.

---

## 🧠 Couche d’accès aux données (hooks)

Chaque domaine métier possède un hook React dédié :

| Domaine         | Hook principal                       |
|----------------|--------------------------------------|
| Produits        | `useProducts`                        |
| Commandes       | `useOrders`                          |
| Clients         | `useCustomers`, `useCustomerDetail`  |
| Utilisateurs    | `useUsersGestion`                    |
| Dashboard       | `useDashboard`                       |
| Légal / RGPD    | `useLegalDocuments`                  |

Ces hooks gèrent :
- le chargement
- les erreurs
- les mutations
- le filtrage
- les toasts de feedback

---

## 🎨 Présentation & Design System

- UI basée sur **shadcn-ui** :
  - Réexportée dans `components/ui`
  - Boutons, tables, popups, menus, etc.

- Utilitaire `cn()` :
  - Pour fusionner dynamiquement des classes Tailwind.

- `AppSidebar` :
  - Affiche la navigation adaptée au rôle utilisateur.
  - Inclut le profil et la déconnexion.

---

## 📄 Pages métiers

| Page                    | Description |
|-------------------------|-------------|
| `Dashboard.tsx`         | Statistiques + Recharts + flux temps réel Supabase. |
| `Products.tsx`          | CRUD Produits avec filtres, modale, fiche. |
| `Categories.tsx`        | Gestion des catégories. |
| `Customers.tsx`         | Liste des clients. |
| `CustomerDetail.tsx`    | Détail client (profil, historique, etc.). |
| `Orders.tsx`            | Suivi des commandes. |
| `AccountManagement.tsx` | Gestion des administrateurs/modérateurs. |
| `Profile.tsx`           | Page profil utilisateur connecté. |
| `Legal.tsx`             | Mentions légales et documents RGPD. |
| `Auth.tsx`              | Authentification (login/register). |
| `SneakyAssistant.tsx`   | Assistant IA (via edge function Supabase). |
| `NotFound.tsx`          | Page 404 personnalisée. |

---

## 🧪 Tests

> ⚠️ Aucune suite de tests automatisée pour le moment (analyse statique uniquement).

---

## 🛠️ Installation & lancement

### Prérequis

- Node.js ou [Bun](https://bun.sh)
- Un projet [Supabase](https://supabase.io) (avec URL et clé API)

### Installation

```bash
#Installation
npm install
#Run du code
npm run dev
```
