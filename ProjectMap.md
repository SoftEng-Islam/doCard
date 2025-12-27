# Flashcard App

> DoCard Is an application to help people learn and study and remember words phrases and things

## Purpose

Simple app to memorize English words.

## 1. Problem Statement (Clear and Narrow)

> Learners need a simple way to memorize English words without complex apps.
> This app allows users to create flashcards and review them quickly.

**Non-goal:** Competing with Anki, spaced repetition systems, or gamification.

## 2. The app is “done” when all items below work

User can:

- Login/SignUp to Use The Application
- The Flashcard manager page
  - First must create a group and give it a name to start add cards into it
  - inside the group can add an English word and add its meaning
  - view flashcards one by one
  - flip card (word ⇄ meaning)
  - delete a card or the whole group or move selected card or all cards into a different group
- The study Page
  - Enter a group
  - Select the study type
    - Select the correct meaning to a specific card
    - Write the correct meaning
    - Sort The Cards

**Explicitly excluded (for now):**

- login / accounts
- spaced repetition
- tags, decks, levels
- statistics
- animations
- mobile app

## 3. User Flow (Simple and Linear)

```text
Open App
 → Add Word + Meaning
 → Card appears in list
 → Click card
 → Flip to see meaning
 → Next / Delete
```

## 4. Data Model (Minimal)

You only need **one collection**.

### Flashcard (MongoDB)

```js
{
  _id: ObjectId,
  word: String,
  meaning: String,
  createdAt: Date
}
```

No userId. No deckId. No metadata.

## 5. API Design (Express)

Keep it boring and RESTful.
GET    /api/cards        → list all cards
POST   /api/cards        → add new card
DELETE /api/cards/:id   → delete card

That’s it. No update endpoint for MVP.

## 6. Frontend Structure (Vue)

Use **one page only**.

### Components

- `AddCardForm.vue`
- `FlashcardViewer.vue`
- `FlashcardItem.vue` (optional)
- `App.vue`

## **Stack** Technologies and Tools that we will use

- Typescript
- Vuejs
- vue-router
- PiniaJs
- axios
- @vueuse/motion
- tippy.js
- vue-tours
- vue3-perfect-scrollbar
- vue3-spinners
- vue-lazyload
- vue-toastification
- Tailwindcss v4
- daisyui
- animate.css
- ExpressJs
- express-async-handler
- mongoose

## The Project Structure

```bash
├── package.json
├── package.old.json
├── pnpm-lock.yaml
├── ProjectMap.md
├── public
│   └── vite.svg
├── README.md
├── shared
│   ├── constants
│   │   └── index.ts
│   └── models
│       ├──
│       └── user-data.ts
├── src
│   ├── client
│   │   ├── App.old.vue
│   │   ├── App.vue
│   │   ├── assets
│   │   ├── components
│   │   ├── main.ts
│   │   ├── services
│   │   ├── style.css
│   │   ├── tsconfig.json
│   │   └── vite-env.d.ts
│   └── server
│       ├── app.ts
│       ├── config
│       ├── controllers
│       ├── main.ts
│       ├── middleware
│       ├── models
│       ├── routes
│       └── utils
├── tsconfig.json
└── vite.config.ts
```

## Page in This Project

- HomePage(Landing Page)
- About Page
- Contact US
-
