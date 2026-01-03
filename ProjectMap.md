# DoCard Project Map & Implementation Plan

> **Project Name**: DoCard
> **Version**: 1.0.0
> **Date**: 2025-12-29
> **Author**: DoCard Team
> **License**: MIT

Note: This is a work in progress and is not yet ready for production.

We must follow the project map and implement the features in the order they are listed.

Rules.md file is available in the root directory.
and we must follow the rules in the Rules.md file.

> **DoCard**: A focused, efficient application for memorizing words, phrases, and concepts.
> _Simple. Fast. Distraction-free._

## 1. Project Vision & Goals

**Core Philosophy**: Simplicity first. Avoid bloat. Focus on the core loop of creation and review.

> **Success Criteria**: The application is considered "Complete" when a user can:

1. **Manage Content**: Create Groups (Decks) and Cards seamlessly.
2. **Study**: Engage in a focused study session with a clean UI.
3. **Sort & Search**: Organize content effectively to find what they need.
4. **Persist**: Save data reliably (initially local/single DB, eventually multi-user).
5. **Offline & Flexible**: Work offline and import data easily (CSV).

---

## 2. Technology Stack

We will use a modern, type-safe full-stack environment.

### **Frontend** (Client)

- **Framework**: Vue 3 (Script Setup, Composition API)
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS v4 + DaisyUI (Themes support)
- **Animations**: Animate.css, @vueuse/motion
- **Utilities**: VueUse, Axios, tippy.js (Tooltips)
- **UX Polish**: vue3-spinners, vue-toastification, vue3-perfect-scrollbar
- **Icons**: iconify @iconify-prerendered Unplugin Icons

### **Backend** (Server)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Validation**: Zod
- **Docs**: Swagger/OpenAPI (Optional but good for API definition)

---

## 3. Development Roadmap

### ✅ Phase 1: MVP Core (The "Walking Skeleton")

_Goal: A working single-user application running locally._

- [x] **Architecture**: Setup Monorepo structure (Vite-Express integration) - **DONE**
- [x] **Database**: Connect to local MongoDB - **DONE**
- [/] **Backend Basic**: Implement CRUD for `Groups` and `Cards`.
  - [x] Card CRUD (via GraphQL) - **DONE**
  - [x] Group CRUD - **DONE**
  - [ ] Admin Section
    - [ ] Dashboard
    - [ ] Users list
- [/] **Frontend Basic**:
  - [x] Landing Page (DaisyUI Redesign) - **DONE**
  - [x] Dashboard (GraphQL integrated) - **DONE**
  - [x] Group Detail (Placeholder) - **DONE**
  - [x] Card Viewer (3D Flip Animation) - **DONE**
  - [x] Card Viewer Need some fixes - **DONE**
  - [x] Card Form popup with vue-toastification if the card created - **DONE**
  - [x] Add tippy in some parts to help users - **DONE**
  - [x] Study Page to add our Study Modes
    - [ ] section for modes to enable/disable like write the answer, chose the answer, etc..
    - [ ] below list of groups to start and each group must have a progress

### ✅ Special: GraphQL & Developer Experience (New)

- [x] **Server**: Migrated to Apollo Server 4 - **DONE**
- [x] **IDE**: Ruru GraphQL IDE at `/ruru` - **DONE**
- [x] **Frontend**: Unified Apollo Client + `@vue/apollo-composable` - **DONE**
- [x] **Style**: Tailwind CSS 4 + DaisyUI Themes - **DONE**

### 🚀 Phase 2: The "Study" & "Sort" Experience

_Goal: Make it actually useful for learning and organizing._

- [ ] **Sorting & Filtering**:
  - **Sort By**: Date Created (Newest/Oldest), Alphabetical (A-Z/Z-A).
  - **Filter By**: Status (New/Learning/Mastered).
- [/] **Study Modes** (Inspired by Flashcard World):
  - [x] **Classic Flashcard**: Flip to see answer (Core flip logic done).
  - [ ] **Writing Review**: Type the answer and check against the back of the card.
  - [ ] **Multiple Choice**: Select the correct answer from generated options (distractors).
- [ ] **UI/UX Polish**:
  - [ ] Transitions between pages.
  - [x] Card flip animations - **DONE**
  - [ ] Loading states (Progress indicators partially implemented).
  - [ ] Toast notifications (Package installed, usage pending in some views).

### 📦 Phase 3: Advanced Features ("Flashcard World" Parity)

_Goal: Add power-user features like portability and smart learning._

- [ ] **Data Portability**:
  - **CSV Import/Export**: Upload a CSV to bulk-create cards.
  - **Backup**: Export all data to a JSON file.
- [ ] **Spaced Repetition System (SRS)**:
  - Implement a basic algorithm (like SM-2) to schedule reviews based on performance.
  - "Due Items" view on the Dashboard.
- [ ] **Offline Capabilities**:
  - PWA (Progressive Web App) manifest.
  - Service Worker for offline caching.

### 🔐 Phase 4: Multi-User (The "Product")

_Goal: Allow multiple users to have private data._

- [x] **Auth Layer**: JWT-based Authentication - **DONE**
- [x] **User Model**: Create User schema - **DONE**
- [ ] **Data Ownership**: Associate Groups/Cards with UserIDs (Logic in resolvers partially there).
- [x] **Auth UI**: Premium Login/Register pages - **DONE**
- [ ] **Community**: Share decks with other users (public/private toggle).

---

## 4. Sorting & Filtering Specs

To help users manage large decks, we will implement the following:

### **Dashboard (Groups)**

- **Sort**:
  - `Last Edited`: Show groups you worked on recently first.
  - `Name (A-Z)`: Alphabetical order.
  - `Card Count`: Largest decks first.

### **Card List / Study Mode**

- **Sort**:
  - `Added Time`: See the most recently added words.
  - `Difficulty`: (Phase 3) Show "Hard" words first.
  - `Random`: Essentials for studying.
- **Search**:
  - Real-time text filter (matches `front` or `back` of card).

---

## 5. API Design (RESTful)

### **Auth Routes**

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Verify token)

### **Group Routes**

- `GET /api/groups` (List user's groups)
- `GET /api/groups/:id` (Get details)
- `POST /api/groups` (Create)
- `PUT /api/groups/:id` (Update)
- `DELETE /api/groups/:id` (Delete - cascade delete cards?)
- `POST /api/groups/import` (CSV Import)

### **Card Routes**

- `GET /api/groups/:groupId/cards` (Get cards for a specific group, supports `?sort=createdAt&order=desc`)
- `POST /api/cards` (Create)
- `PUT /api/cards/:id` (Update content, move groups, or update SRS status)
- `DELETE /api/cards/:id` (Delete)

---

## 6. Detailed Folder & File Structure

This structure is designed for scalability and separation of concerns.

```text
/
├── package.json               # Root scripts (start:all, build:all)
├── tsconfig.json              # Base TypeScript config
├── .gitignore
├── README.md
├── ProjectMap.md
│
├── shared/                    # [SHARED] Types and Constants
│   ├── index.ts               # Export all
│   ├── types/
│   │   ├── models.ts          # export interface IUser, IGroup, ICard
│   │   └── api.ts             # export interface ApiError, ApiResponse<T>
│   └── constants/
│       └── validation.ts      # Shared Zod schemas (e.g., loginSchema)
│
├── src/
│   ├── client/                # [CLIENT] Vue 3 Application
│   │   ├── index.html         # Entry HTML
│   │   ├── vite.config.ts     # Vite Configuration
│   │   ├── tailwind.config.ts # Tailwind Configuration
│   │   ├── main.ts            # App Entry Point (mounts App.vue)
│   │   ├── App.vue            # Root Component (Router View + Layout)
│   │   ├── env.d.ts           # Type definitions
│   │   │
│   │   ├── assets/            # Static assets
│   │   │   └── logo.svg
│   │   │
│   │   ├── components/        # [COMPONENTS] Reusable UI Components
│   │   │   ├── ui/            # Generic UI (Buttons, Inputs)
│   │   │   │   ├── BaseButton.vue
│   │   │   │   ├── BaseInput.vue
│   │   │   │   └── ModalDialog.vue
│   │   │   │
│   │   │   ├── layout/        # Layout components
│   │   │   │   ├── NavBar.vue    # Top navigation
│   │   │   │   └── Footer.vue
│   │   │   │
│   │   │   ├── groups/        # Domain-specific: Groups
│   │   │   │   ├── GroupCard.vue # Display a group summary
│   │   │   │   └── GroupForm.vue # Create/Edit group
│   │   │   │
│   │   │   └── cards/         # Domain-specific: Cards
│   │   │       ├── FlashCard.vue # The flippable card
│   │   │       ├── CardList.vue  # List view for management
│   │   │       ├── CardForm.vue  # Add/Edit card
│   │   │       └── CSVImporter.vue # [NEW] Bulk upload UI
│   │   │
│   │   ├── pages/             # [PAGES] View Controllers
│   │   │   ├── HomeView.vue      # Landing Page
│   │   │   ├── LoginView.vue     # Auth
│   │   │   ├── RegisterView.vue  # Auth
│   │   │   ├── DashboardView.vue # Main User Dashboard
│   │   │   ├── GroupDetailView.vue # Use list of cards
│   │   │   └── StudyView.vue     # The active study session
│   │   │
│   │   ├── router/            # [ROUTER]
│   │   │   └── index.ts       # Route definitions & Guard checks
│   │   │
│   │   ├── stores/            # [STORES] Pinia State Management
│   │   │   ├── auth.store.ts  # Current user, token, login()
│   │   │   ├── groups.store.ts # Groups list, caching
│   │   │   └── study.store.ts # Current active session state
│   │   │
│   │   └── services/          # [SERVICES] API Communication
│   │       ├── api.client.ts  # Axios instance (interceptors)
│   │       ├── auth.service.ts
│   │       └── data.service.ts # Groups/Cards CRUD
│   │
│   └── server/                # [SERVER] Express Backend
│       ├── package.json
│       ├── nodemon.json
│       ├── app.ts             # Express App setup (middleware)
│       ├── server.ts          # Server entry (listens on port)
│       │
│       ├── config/            # [CONFIG]
│       │   ├── db.ts          # Mongoose connection
│       │   └── env.ts         # Environment variables (PORT, MONGO_URI)
│       │
│       ├── models/            # [MODELS] Mongoose Schemas
│       │   ├── User.ts
│       │   ├── Group.ts
│       │   └── Card.ts
│       │
│       ├── routes/            # [ROUTES] Route Definition
│       │   ├── index.ts       # Master router
│       │   ├── auth.routes.ts
│       │   ├── groups.routes.ts
│       │   └── cards.routes.ts
│       │
│       ├── controllers/       # [CONTROLLERS] Request Logic
│       │   ├── auth.controller.ts  # login, register
│       │   ├── group.controller.ts # getGroups, createGroup
│       │   └── card.controller.ts  # getCards, createCard
│       │
│       └── middleware/        # [MIDDLEWARE]
│           ├── auth.middleware.ts  # Validates JWT
│           ├── error.middleware.ts # Global error handler
│           └── validate.ts         # Zod validation wrapper
```
