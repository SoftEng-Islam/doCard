# DoCard --- Complete Architecture & Implementation Specification

**Project:** DoCard\
**Repository:** `SoftEng-Islam/doCard`\
**Document version:** 1.0\
**Status:** Initial implementation specification\
**Primary goal:** Build a community-driven, cross-platform learning
platform for flashcards, vocabulary, glossaries, and other educational
content.

------------------------------------------------------------------------

## Table of Contents

1.  [Executive Summary](#1-executive-summary)
2.  [Product Vision](#2-product-vision)
3.  [Confirmed Architecture
    Decisions](#3-confirmed-architecture-decisions)
4.  [Product Scope](#4-product-scope)
5.  [Core Concepts and Terminology](#5-core-concepts-and-terminology)
6.  [Functional Requirements](#6-functional-requirements)
7.  [Non-Functional Requirements](#7-non-functional-requirements)
8.  [Recommended Technology Stack](#8-recommended-technology-stack)
9.  [Package Selection Table](#9-package-selection-table)
10. [Architecture Overview](#10-architecture-overview)
11. [Repository and Monorepo
    Structure](#11-repository-and-monorepo-structure)
12. [Backend Architecture](#12-backend-architecture)
13. [Database Architecture](#13-database-architecture)
14. [Database Schema](#14-database-schema)
15. [Community Ownership and
    Permissions](#15-community-ownership-and-permissions)
16. [GraphQL API Specification](#16-graphql-api-specification)
17. [Authentication and Security](#17-authentication-and-security)
18. [Offline-First Strategy](#18-offline-first-strategy)
19. [Synchronization Protocol](#19-synchronization-protocol)
20. [Learning and Spaced Repetition](#20-learning-and-spaced-repetition)
21. [Web, Desktop, and Mobile
    Strategy](#21-web-desktop-and-mobile-strategy)
22. [Markdown Blog Architecture](#22-markdown-blog-architecture)
23. [Testing Strategy](#23-testing-strategy)
24. [Observability and Operations](#24-observability-and-operations)
25. [Development Roadmap](#25-development-roadmap)
26. [First Implementation Sprint](#26-first-implementation-sprint)
27. [Definition of Done](#27-definition-of-done)
28. [Risks and Trade-offs](#28-risks-and-trade-offs)
29. [Open Decisions](#29-open-decisions)
30. [Practical Starting Checklist](#30-practical-starting-checklist)
31. [Claude Implementation Prompt](#31-claude-implementation-prompt)

------------------------------------------------------------------------

# 1. Executive Summary

DoCard is a learning platform designed to help people and students learn
languages, vocabulary, terminology, glossaries, and other educational
subjects through interactive flashcards.

The platform will allow users to:

-   Create and organize learning content.
-   Build groups, categories, decks, and cards.
-   Study cards through interactive sessions.
-   Publish learning materials for the community.
-   Discover and study public decks created by other users.
-   Continue studying when offline.
-   Synchronize learning activity across Web, Desktop, Android, and iOS.
-   Read educational and product-related articles through a
    Markdown-based blog.

DoCard should be developed as an API-driven platform with:

-   PostgreSQL as the primary database.
-   GraphQL as the main API.
-   A modular monolith backend.
-   Nuxt and Vue for the web interface.
-   Rust and Tauri for desktop and mobile applications.
-   Early offline support.
-   Community-oriented publishing and moderation.
-   Markdown files for the initial blog.

The first version should focus on a reliable learning workflow instead
of implementing every planned feature at once.

The first practical product milestone is:

> A user can register, log in, create a learning deck, add flashcards,
> study them, download eligible decks for offline use, and synchronize
> review events after reconnecting.

------------------------------------------------------------------------

# 2. Product Vision

## 2.1 Main objective

Build a modern learning ecosystem where users can create, discover,
organize, and study educational materials across multiple platforms.

The product should initially focus on flashcard-based learning, but its
architecture should allow future expansion into:

-   Language learning.
-   Glossary learning.
-   Technical terminology.
-   Public educational collections.
-   Community-created learning resources.
-   Spaced repetition.
-   Progress tracking.
-   Collaborative learning.
-   Multimedia cards.
-   Educational articles.

## 2.2 Main product sections

### A. Landing Page

The landing page introduces DoCard to visitors.

Planned content:

-   Hero section.
-   Product explanation.
-   Screenshots and illustrations.
-   Example flashcards.
-   Feature descriptions.
-   Calls to action.
-   About Us.
-   Support Us.
-   Contact.
-   Blog links.
-   Sign Up and Sign In.
-   Search-engine-friendly content.

### B. Blog

The blog contains educational content and project-related articles.

Potential categories:

-   English learning.
-   French learning.
-   Vocabulary.
-   Study techniques.
-   Programming terminology.
-   Product updates.
-   Tutorials.
-   Community announcements.

The first blog implementation should use Markdown files stored in the
repository.

### C. Main Application

The main application requires authentication for private features.

Planned features:

-   User accounts.
-   Groups.
-   Categories.
-   Decks.
-   Cards.
-   Public and private content.
-   Study sessions.
-   Review history.
-   Progress tracking.
-   Offline learning.
-   Synchronization.

------------------------------------------------------------------------

# 3. Confirmed Architecture Decisions

  -----------------------------------------------------------------------
  Area                    Decision                Implementation Meaning
  ----------------------- ----------------------- -----------------------
  Database                PostgreSQL              Use a relational
                                                  database with
                                                  migrations,
                                                  constraints, and
                                                  transactions.

  API                     GraphQL                 Use GraphQL as the main
                                                  client-facing API.

  Content ownership       Community               Users can create and
                                                  publish learning
                                                  content, with
                                                  permissions and
                                                  moderation.

  Offline support         Early                   Design offline study
                                                  and synchronization
                                                  before the MVP is
                                                  finished.

  Mobile framework        Tauri                   Evaluate and use Tauri
                                                  2 for desktop and
                                                  mobile where supported.

  Blog                    Markdown                Store initial blog
                                                  articles as
                                                  version-controlled
                                                  Markdown files.

  Backend style           Modular monolith        One backend deployment
                                                  with clearly separated
                                                  modules.

  Initial learning model  Decks and cards         Use decks as
                                                  collections of cards
                                                  and support
                                                  groups/categories for
                                                  organization.
  -----------------------------------------------------------------------

## 3.1 Architectural principles

1.  Use one shared backend for all clients.
2.  Keep domain logic independent of the frontend.
3.  Enforce permissions on the backend.
4.  Use migrations for every database schema change.
5.  Treat offline synchronization as a first-class design concern.
6.  Keep the first release smaller than the long-term vision.
7.  Prefer explicit, understandable code over premature abstractions.
8.  Document architectural decisions in the repository.
9.  Use automated tests for security-sensitive and
    synchronization-sensitive logic.
10. Avoid introducing packages without a concrete purpose.

------------------------------------------------------------------------

# 4. Product Scope

## 4.1 MVP scope

The MVP should include:

-   User registration.
-   Login and logout.
-   User profile.
-   Groups and categories.
-   Deck creation and editing.
-   Card creation and editing.
-   Draft and public publication states.
-   Public deck browsing.
-   Basic deck search or filtering.
-   Study mode.
-   Basic review event recording.
-   Downloading eligible decks for offline study.
-   Offline review queue.
-   Initial synchronization.
-   Markdown blog.
-   Responsive web application.

## 4.2 Post-MVP scope

Potential future features:

-   Full spaced repetition using FSRS.
-   Advanced statistics.
-   Audio and pronunciation.
-   Images and multimedia.
-   Community moderation dashboard.
-   Deck versioning.
-   Deck cloning.
-   Favorites and bookmarks.
-   User follows.
-   Collaborative editing.
-   Comments and discussions.
-   Notifications.
-   Recommendations.
-   Advanced search.
-   Organizations or classrooms.
-   Teacher and student roles.
-   Premium or supporter features.

## 4.3 Features to avoid in the first milestone

Do not initially implement:

-   Microservices.
-   Full collaborative editing.
-   Complex recommendation algorithms.
-   Multiple databases without a clear requirement.
-   Full offline editing of every entity.
-   A custom spaced repetition algorithm.
-   A complete CMS.
-   Real-time subscriptions unless a real use case exists.

------------------------------------------------------------------------

# 5. Core Concepts and Terminology

Use consistent terminology throughout the codebase and documentation.

  -----------------------------------------------------------------------
  Term                                Definition
  ----------------------------------- -----------------------------------
  User                                An authenticated account.

  Group                               A high-level container for
                                      organizing learning materials.

  Category                            A subdivision inside a group.

  Deck                                A collection of flashcards. The UI
                                      may call this a "set".

  Card                                An individual learning item with a
                                      prompt and answer.

  Study session                       A period during which a user
                                      studies cards.

  Review event                        A recorded answer or rating for a
                                      card.

  Publication                         The process of making a deck
                                      publicly discoverable.

  Owner                               The user or entity responsible for
                                      managing content.

  Author                              The user who created the content.

  Moderator                           A privileged user who handles
                                      reports and policy violations.

  Sync cursor                         A marker used to request changes
                                      after a known point.

  Client ID                           A stable identifier for a
                                      particular installation or device.
  -----------------------------------------------------------------------

## 5.1 Recommended hierarchy

``` text
Group
└── Category
    └── Deck
        └── Card
```

Example:

``` text
Group: Languages
└── Category: English
    └── Deck: English A1 Vocabulary
        ├── Card: Apple
        ├── Card: Book
        └── Card: House
```

This hierarchy should not prevent future many-to-many tagging or
community collections.

------------------------------------------------------------------------

# 6. Functional Requirements

## 6.1 User requirements

Users should be able to:

-   Register an account.
-   Sign in and sign out.
-   Manage their profile.
-   View their own content.
-   View public community content.
-   Download decks for offline study.
-   Study cards.
-   Submit review results.
-   View basic progress.
-   Report inappropriate content.

## 6.2 Content requirements

Users should be able to:

-   Create groups.
-   Create categories.
-   Create decks.
-   Add cards.
-   Edit cards.
-   Delete cards.
-   Reorder cards.
-   Save drafts.
-   Publish decks.
-   Archive their decks.
-   Clone public decks into their own account in a later phase.

## 6.3 Community requirements

The community system should support:

-   Public and private decks.
-   Public discovery.
-   Content reporting.
-   Moderator review.
-   Content removal or restriction.
-   Author attribution.
-   Clear editing permissions.
-   Publication status.

Public visibility must not automatically grant public editing rights.

## 6.4 Offline requirements

The initial offline feature should support:

-   Downloading eligible decks.
-   Reading cached cards.
-   Studying without network access.
-   Saving review events locally.
-   Retrying failed synchronization.
-   Deduplicating events.
-   Recovering after app restart.
-   Reporting rejected synchronization events.

------------------------------------------------------------------------

# 7. Non-Functional Requirements

## 7.1 Security

-   Never store plaintext passwords.
-   Use Argon2id for password hashing.
-   Protect sessions or tokens.
-   Enforce authorization server-side.
-   Validate all external input.
-   Apply rate limits to authentication and abuse-prone operations.
-   Avoid leaking sensitive information in error messages.
-   Use secure secrets management.
-   Use HTTPS in production.
-   Audit security-sensitive operations.

## 7.2 Performance

-   Paginate large collections.
-   Add indexes based on real query patterns.
-   Avoid N+1 GraphQL queries.
-   Use batching or DataLoader where appropriate.
-   Cache public content carefully.
-   Avoid downloading complete decks when only metadata is needed.
-   Keep mobile payloads small.

## 7.3 Maintainability

-   Use consistent module boundaries.
-   Keep services focused.
-   Use typed interfaces.
-   Write tests for critical business logic.
-   Document decisions.
-   Prefer migrations over manual database changes.
-   Keep frontend and backend responsibilities separate.

## 7.4 Reliability

-   Use database transactions for related writes.
-   Make synchronization operations idempotent.
-   Log errors with correlation identifiers.
-   Provide health checks.
-   Back up production data.
-   Test restoration procedures.
-   Use graceful shutdown.

------------------------------------------------------------------------

# 8. Recommended Technology Stack

## 8.1 Core stack

  -----------------------------------------------------------------------
  Layer                   Selected Technology     Reason
  ----------------------- ----------------------- -----------------------
  Package manager         pnpm                    Workspace support and
                                                  efficient dependency
                                                  management.

  Language                TypeScript              Shared types and strong
                                                  tooling across web and
                                                  backend.

  Web framework           Nuxt                    Vue-based application
                                                  and public website.

  UI framework            Vue                     Component-based
                                                  frontend development.

  Build tooling           Vite                    Fast development and
                                                  frontend tooling.

  State management        Pinia                   Explicit client-side
                                                  state management.

  API                     GraphQL                 Shared flexible API for
                                                  multiple clients.

  GraphQL server          Apollo Server or        Mature GraphQL server
                          compatible server       ecosystem.

  Validation              Zod                     Runtime validation with
                                                  TypeScript inference.

  Database                PostgreSQL              Relational data model,
                                                  transactions, and
                                                  constraints.

  Database access         Drizzle ORM or selected Type-safe database
                          alternative             access and migrations.

  Password hashing        Argon2id                Secure password
                                                  hashing.

  Testing                 Vitest                  Unit and integration
                                                  testing for TypeScript.

  Desktop/mobile          Tauri 2                 Rust-based
                                                  cross-platform
                                                  application framework.

  Blog                    Markdown + Nuxt Content Version-controlled
                          or custom loader        editorial content.
  -----------------------------------------------------------------------

## 8.2 Technologies to evaluate rather than automatically install

The following technologies were mentioned as part of your existing
knowledge, but should not all be installed by default:

-   MongoDB.
-   Mongoose.
-   Express.
-   JWT.
-   Ruru.
-   `pg-hstore`.
-   Pug.
-   Sass.
-   Tailwind CSS.
-   DaisyUI.
-   `express-async-handler`.
-   Apollo Client.
-   `@vueuse`.

A package should be added only when its role is clear and it fits the
final architecture.

------------------------------------------------------------------------

# 9. Package Selection Table

This table separates required packages, likely packages, optional
packages, and packages that should be evaluated later.

## 9.1 Workspace and development tools

  --------------------------------------------------------------------------------------
  Package               Category               Priority Purpose            Decision
  --------------------- ------------- ----------------- ------------------ -------------
  `pnpm`                Tooling                Required Monorepo and       Use
                                                        dependency         
                                                        management.        

  `typescript`          Language               Required Static typing.     Use

  `vite`                Build                  Required Frontend tooling.  Use through
                                                                           Nuxt/Tauri
                                                                           where
                                                                           applicable

  `vitest`              Testing                Required Unit and           Use
                                                        integration tests. 

  `eslint`              Quality             Recommended Static code        Use
                                                        analysis.          

  `prettier`            Formatting          Recommended Consistent         Use if
                                                        formatting.        preferred

  `typescript-eslint`   Quality             Recommended TypeScript-aware   Evaluate
                                                        ESLint rules.      

  `lint-staged`         Quality                Optional Run checks on      Later
                                                        staged files.      

  `husky`               Quality                Optional Git hooks.         Later

  `chalk`               CLI                    Optional Terminal styling.  Use only if
                                                                           needed
  --------------------------------------------------------------------------------------

## 9.2 Frontend packages

  ---------------------------------------------------------------------------------
  Package           Category               Priority Purpose          Decision
  ----------------- ------------- ----------------- ---------------- --------------
  `nuxt`            Framework              Required Web application  Use
                                                    and public site. 

  `vue`             UI                     Required Frontend         Use through
                                                    framework.       Nuxt

  `pinia`           State               Recommended Client state     Use
                                                    management.      

  `@pinia/nuxt`     Nuxt                Recommended Pinia            Evaluate
                    integration                     integration.     

  `@vueuse/core`    Utilities           Recommended Reusable Vue     Use
                                                    utilities.       selectively

  `@vueuse/nuxt`    Nuxt                   Optional Nuxt integration Evaluate
                    integration                     for VueUse.      

  `tailwindcss`     Styling                Optional Utility-first    Evaluate
                                                    CSS.             

  `daisyui`         UI                     Optional Tailwind         Evaluate
                                                    component        
                                                    system.          

  `sass`            Styling                Optional Sass             Only if needed
                                                    preprocessing.   

  `pug`             Templates              Optional Pug template     Avoid unless
                                                    syntax.          needed

  `@nuxt/content`   Content             Recommended Markdown content Evaluate/use
                                                    management.      

  `@nuxt/image`     Media               Recommended Image            Evaluate
                                                    optimization.    

  `@nuxtjs/seo`     SEO                 Recommended SEO features.    Evaluate
  ---------------------------------------------------------------------------------

## 9.3 GraphQL packages

  -------------------------------------------------------------------------------------------
  Package                    Category               Priority Purpose            Decision
  -------------------------- ------------- ----------------- ------------------ -------------
  `graphql`                  API                    Required GraphQL schema and Use
                                                             execution.         

  `@apollo/server`           API server          Recommended GraphQL server     Evaluate
                                                             implementation.    

  `@apollo/client`           API client          Recommended GraphQL client and Evaluate
                                                             caching.           

  `graphql-code-generator`   Code                Recommended Generate typed     Evaluate
                             generation                      operations and     
                                                             types.             

  `@graphql-codegen/cli`     Code                Recommended Code generation    Evaluate
                             generation                      CLI.               

  `graphql-scalars`          GraphQL                Optional Common scalar      Add if needed
                                                             implementations.   

  `ruru`                     GraphQL                Optional GraphQL            Evaluate
                             tooling                         development        actual need
                                                             tooling.           
  -------------------------------------------------------------------------------------------

Do not automatically use Apollo Server, Apollo Client, GraphQL Code
Generator, and Ruru together without defining their responsibilities.

A reasonable initial setup is:

``` text
graphql
├── Apollo Server
├── GraphQL Code Generator
└── Apollo Client or another typed client
```

## 9.4 Backend packages

  -------------------------------------------------------------------------------------------
  Package                   Category                  Priority Purpose         Decision
  ------------------------- ---------------- ----------------- --------------- --------------
  `express`                 HTTP server               Optional HTTP server and Use only if
                                                               middleware.     selected

  `@apollo/server`          GraphQL                Recommended GraphQL API     Evaluate
                                                               server.         

  `zod`                     Validation                Required Runtime input   Use
                                                               validation.     

  `express-async-handler`   Express utility           Optional Async Express   Not needed if
                                                               error handling. architecture
                                                                               handles errors
                                                                               directly

  `jsonwebtoken`            Authentication            Optional JWT creation    Use only if
                                                               and             JWT is
                                                               verification.   selected

  `argon2`                  Security                  Required Password        Use
                                                               hashing.        

  `dotenv`                  Configuration             Optional Environment     Depends on
                                                               loading.        runtime

  `pino`                    Logging                Recommended Structured      Evaluate
                                                               logging.        

  `pino-pretty`             Logging                   Optional Development log Development
                                                               formatting.     only
  -------------------------------------------------------------------------------------------

## 9.5 Database packages

  -------------------------------------------------------------------------------------------
  Package            Category                 Priority Purpose                 Decision
  ------------------ --------------- ----------------- ----------------------- --------------
  `drizzle-orm`      ORM                   Recommended Type-safe SQL-oriented  Primary
                                                       database access.        candidate

  `drizzle-kit`      Migrations            Recommended Schema and migration    Primary
                                                       tooling.                candidate

  `pg`               PostgreSQL      Required if using PostgreSQL              Use with
                     driver              node-postgres connectivity.           selected ORM

  `postgres`         PostgreSQL            Alternative PostgreSQL client.      Evaluate as
                     driver                                                    alternative

  `prisma`           ORM                   Alternative ORM and migration       Evaluate
                                                       tooling.                instead of
                                                                               Drizzle

  `@prisma/client`   ORM                   Alternative Prisma runtime client.  Only if Prisma
                                                                               selected

  `pg-hstore`        Serialization        Not required Commonly used with      Do not add by
                                                       Sequelize/PostgreSQL.   default

  `mongoose`         MongoDB ORM          Not required MongoDB data access.    Do not use
                                                                               with
                                                                               PostgreSQL
                                                                               architecture
  -------------------------------------------------------------------------------------------

Choose one primary database access strategy. Do not install Drizzle and
Prisma together unless there is a specific, documented reason.

## 9.6 Tauri packages and tooling

  -------------------------------------------------------------------------------------------
  Package / Tool      Category                  Priority Purpose              Decision
  ------------------- ---------------- ----------------- -------------------- ---------------
  `tauri`             Desktop/mobile      Required later Tauri application    Use
                                                         framework.           

  `@tauri-apps/api`   Tauri API           Required later Frontend-to-native   Use
                                                         API access.          

  `@tauri-apps/cli`   Build tooling       Required later Tauri development    Use
                                                         and builds.          

  Tauri Store plugin  Native storage            Evaluate Secure key-value     Evaluate
                                                         persistence.         

  Tauri SQL plugin    Local database            Evaluate Local database       Evaluate
                                                         access.              compatibility

  Tauri Stronghold    Secure storage            Evaluate Secure secrets       Evaluate
  plugin                                                 storage.             

  Rust                Native layer        Required later Native commands and  Use
                                                         integrations.        

  SQLite              Local database            Evaluate Offline client       Evaluate
                                                         storage.             

  IndexedDB           Web storage               Evaluate Offline browser      Evaluate
                                                         storage.             
  -------------------------------------------------------------------------------------------

The local storage strategy must be compatible with Web, Linux desktop,
Windows desktop, macOS, Android, and iOS where required. Do not assume
that one storage plugin automatically provides identical behavior on all
targets.

## 9.7 Content and Markdown packages

  -----------------------------------------------------------------------------------
  Package           Category                Priority Purpose           Decision
  ----------------- -------------- ----------------- ----------------- --------------
  `@nuxt/content`   Content              Recommended Markdown content  Evaluate/use
                                                     in Nuxt.          

  `remark`          Markdown                Optional Markdown          Add if custom
                                                     processing.       pipeline is
                                                                       needed

  `rehype`          HTML                    Optional HTML              Add if needed
                    processing                       transformation.   

  `gray-matter`     Frontmatter             Optional Parse Markdown    Add if not
                                                     frontmatter.      using Nuxt
                                                                       Content

  `sanitize-html`   Security         Recommended for Sanitize rendered Required if
                                      untrusted HTML HTML.             community HTML
                                                                       is rendered

  `shiki`           Syntax                  Optional Code block        Add if needed
                    highlighting                     highlighting.     
  -----------------------------------------------------------------------------------

Markdown files in the repository are trusted editorial content only if
the publishing process is controlled. Community-authored Markdown
requires additional sanitization and moderation safeguards.

------------------------------------------------------------------------

# 10. Architecture Overview

``` text
                           DoCard Clients
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Nuxt Web       Tauri Desktop       Tauri Android/iOS       │
│                                                             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
                    GraphQL API Gateway
                               │
                               ▼
                    Authentication Context
                               │
                               ▼
                    Application Services
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
      Users                Community              Learning
        │                  Content                  │
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                               ▼
                      Repository Layer
                               │
                               ▼
                         PostgreSQL
```

Supporting infrastructure:

``` text
PostgreSQL
├── Main application data
├── Sessions
├── Community content
├── Learning progress
└── Review events

Object storage (future)
├── Audio
├── Images
└── Other media

Markdown repository
└── Public editorial blog
```

------------------------------------------------------------------------

# 11. Repository and Monorepo Structure

Recommended starting structure:

``` text
doCard/
├── apps/
│   ├── web/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   └── nuxt.config.ts
│   │
│   └── client/
│       ├── src/
│       └── src-tauri/
│
├── packages/
│   ├── api-client/
│   ├── shared-types/
│   ├── validation/
│   └── config/
│
├── server/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── db/
│   │   │   ├── client.ts
│   │   │   ├── schema/
│   │   │   └── migrations/
│   │   ├── graphql/
│   │   │   ├── schema.ts
│   │   │   ├── context.ts
│   │   │   └── resolvers/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── groups/
│   │   │   ├── categories/
│   │   │   ├── decks/
│   │   │   ├── cards/
│   │   │   ├── learning/
│   │   │   ├── sync/
│   │   │   └── moderation/
│   │   ├── middleware/
│   │   └── errors/
│   └── tests/
│
├── content/
│   └── blog/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   └── decisions/
│
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## 11.1 Module responsibilities

  -----------------------------------------------------------------------
  Module                              Responsibility
  ----------------------------------- -----------------------------------
  `auth`                              Registration, login, logout,
                                      sessions, password management.

  `users`                             User profiles and account settings.

  `groups`                            Group creation, ownership, and
                                      visibility.

  `categories`                        Category management and
                                      organization.

  `decks`                             Deck CRUD, publication, visibility,
                                      and permissions.

  `cards`                             Card CRUD, ordering, and content
                                      validation.

  `learning`                          Study sessions, reviews, progress,
                                      scheduling.

  `sync`                              Offline event processing and
                                      synchronization.

  `moderation`                        Reports, review, content
                                      restriction, and audit records.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 12. Backend Architecture

## 12.1 Modular monolith

The initial backend should be one deployable service with clear modules.

Benefits:

-   Easier local development.
-   Easier debugging.
-   Lower deployment complexity.
-   Shared transactions.
-   Simpler testing.
-   Clear path to extracting services later if needed.

Avoid starting with microservices. Extract a service only when
operational or scaling requirements justify it.

## 12.2 Layer responsibilities

### GraphQL layer

Responsibilities:

-   Parse GraphQL requests.
-   Validate GraphQL input types.
-   Build request context.
-   Call application services.
-   Map domain errors to API errors.

Resolvers should not contain complex business logic.

### Application service layer

Responsibilities:

-   Coordinate business operations.
-   Validate permissions.
-   Call repositories.
-   Manage transactions.
-   Apply business rules.
-   Return domain results.

### Repository layer

Responsibilities:

-   Read and write database records.
-   Encapsulate database-specific queries.
-   Provide reusable data access methods.
-   Avoid exposing database implementation details to GraphQL.

### Domain logic

Responsibilities:

-   Permission policies.
-   Publication state transitions.
-   Review event rules.
-   Synchronization validation.
-   Learning scheduling rules.

------------------------------------------------------------------------

# 13. Database Architecture

PostgreSQL should be the source of truth for server-side application
data.

## 13.1 Database principles

-   Use UUID or another consistent identifier strategy.
-   Use foreign keys.
-   Use unique constraints.
-   Use check constraints where appropriate.
-   Use timestamps consistently in UTC.
-   Use migrations.
-   Use transactions for related writes.
-   Add indexes based on real query patterns.
-   Avoid unstructured JSONB for core relational data.

## 13.2 Suggested database domains

``` text
Identity
├── users
├── sessions
└── user_devices

Content
├── groups
├── categories
├── decks
├── cards
├── deck_members
└── deck_versions

Learning
├── study_progress
├── review_events
└── study_sessions

Moderation
├── reports
└── moderation_actions
```

------------------------------------------------------------------------

# 14. Database Schema

The following schema is a starting point. It should be converted into
actual migrations after inspecting the repository and choosing the ORM.

## 14.1 Users

``` text
users
- id UUID PRIMARY KEY
- email TEXT NOT NULL UNIQUE
- password_hash TEXT NOT NULL
- display_name TEXT NOT NULL
- role TEXT NOT NULL DEFAULT 'user'
- created_at TIMESTAMPTZ NOT NULL
- updated_at TIMESTAMPTZ NOT NULL
```

Possible later fields:

-   Email verification state.
-   Account status.
-   Avatar reference.
-   Preferred language.
-   Time zone.
-   Deleted-at timestamp.

## 14.2 Sessions

``` text
sessions
- id UUID PRIMARY KEY
- user_id UUID NOT NULL REFERENCES users(id)
- token_hash TEXT NOT NULL UNIQUE
- expires_at TIMESTAMPTZ NOT NULL
- created_at TIMESTAMPTZ NOT NULL
- revoked_at TIMESTAMPTZ NULL
```

Store a hash of the session token rather than the raw token where
appropriate.

## 14.3 Groups

``` text
groups
- id UUID PRIMARY KEY
- owner_id UUID NOT NULL REFERENCES users(id)
- name TEXT NOT NULL
- description TEXT NULL
- visibility TEXT NOT NULL DEFAULT 'private'
- created_at TIMESTAMPTZ NOT NULL
- updated_at TIMESTAMPTZ NOT NULL
```

## 14.4 Categories

``` text
categories
- id UUID PRIMARY KEY
- group_id UUID NOT NULL REFERENCES groups(id)
- name TEXT NOT NULL
- description TEXT NULL
- created_at TIMESTAMPTZ NOT NULL
- updated_at TIMESTAMPTZ NOT NULL
```

## 14.5 Decks

``` text
decks
- id UUID PRIMARY KEY
- owner_id UUID NOT NULL REFERENCES users(id)
- category_id UUID NULL REFERENCES categories(id)
- title TEXT NOT NULL
- description TEXT NULL
- visibility TEXT NOT NULL DEFAULT 'private'
- publication_status TEXT NOT NULL DEFAULT 'draft'
- version INTEGER NOT NULL DEFAULT 1
- created_at TIMESTAMPTZ NOT NULL
- updated_at TIMESTAMPTZ NOT NULL
- published_at TIMESTAMPTZ NULL
```

Suggested publication states:

``` text
draft
published
archived
removed
```

## 14.6 Cards

``` text
cards
- id UUID PRIMARY KEY
- deck_id UUID NOT NULL REFERENCES decks(id)
- position INTEGER NOT NULL
- front_content TEXT NOT NULL
- back_content TEXT NOT NULL
- metadata JSONB NULL
- created_at TIMESTAMPTZ NOT NULL
- updated_at TIMESTAMPTZ NOT NULL
```

Potential future card-related tables:

``` text
card_examples
card_translations
card_media
card_tags
```

Do not create every future table before the requirements are clear.

## 14.7 Deck members

``` text
deck_members
- deck_id UUID NOT NULL REFERENCES decks(id)
- user_id UUID NOT NULL REFERENCES users(id)
- role TEXT NOT NULL
- created_at TIMESTAMPTZ NOT NULL
- PRIMARY KEY (deck_id, user_id)
```

Possible roles:

``` text
owner
editor
viewer
```

The owner can be represented either in `decks.owner_id` or through
membership. If both are used, define clear consistency rules. Avoid
ambiguous ownership models.

## 14.8 Review events

``` text
review_events
- id UUID PRIMARY KEY
- event_id UUID NOT NULL UNIQUE
- user_id UUID NOT NULL REFERENCES users(id)
- card_id UUID NOT NULL REFERENCES cards(id)
- client_id UUID NOT NULL
- rating TEXT NOT NULL
- reviewed_at TIMESTAMPTZ NOT NULL
- received_at TIMESTAMPTZ NOT NULL
```

The `event_id` must be unique so retries do not create duplicate review
records.

## 14.9 Study progress

``` text
study_progress
- id UUID PRIMARY KEY
- user_id UUID NOT NULL REFERENCES users(id)
- card_id UUID NOT NULL REFERENCES cards(id)
- state TEXT NOT NULL
- review_count INTEGER NOT NULL DEFAULT 0
- due_at TIMESTAMPTZ NULL
- last_reviewed_at TIMESTAMPTZ NULL
- stability NUMERIC NULL
- difficulty NUMERIC NULL
- updated_at TIMESTAMPTZ NOT NULL
```

Add a unique constraint on `(user_id, card_id)` if each user should have
one current progress row per card.

## 14.10 Reports

``` text
reports
- id UUID PRIMARY KEY
- reporter_id UUID NOT NULL REFERENCES users(id)
- deck_id UUID NULL REFERENCES decks(id)
- card_id UUID NULL REFERENCES cards(id)
- reason TEXT NOT NULL
- description TEXT NULL
- status TEXT NOT NULL DEFAULT 'open'
- created_at TIMESTAMPTZ NOT NULL
- resolved_at TIMESTAMPTZ NULL
```

A report should identify the target and the reporter. Avoid deleting all
audit information when content is removed.

------------------------------------------------------------------------

# 15. Community Ownership and Permissions

Community content requires explicit permission rules.

## 15.1 Content lifecycle

``` text
DRAFT
  │
  ├── Publish
  ▼
PUBLISHED
  │
  ├── Archive
  ├── Update
  └── Moderation action
        │
        ▼
      REMOVED
```

## 15.2 Permission matrix

  Action                Owner         Editor       Viewer             Moderator
  ------------------- ------- -------------- ------------ ---------------------
  View private deck       Yes            Yes   If granted   According to policy
  Edit deck               Yes            Yes           No   According to policy
  Publish deck            Yes   Configurable           No   According to policy
  Archive deck            Yes   Configurable           No   According to policy
  Study public deck       Yes            Yes          Yes                   Yes
  Report deck             Yes            Yes          Yes                   Yes
  Review reports           No             No           No                   Yes

The exact moderator permissions should be documented separately and
audited.

## 15.3 Security rule

Never rely on the frontend to determine whether a user is allowed to
perform an action.

The backend must validate:

-   Current identity.
-   Resource existence.
-   Resource visibility.
-   Ownership.
-   Membership role.
-   Publication state.
-   Moderation restrictions.

------------------------------------------------------------------------

# 16. GraphQL API Specification

## 16.1 API structure

``` text
Query
├── me
├── user
├── groups
├── categories
├── decks
├── cards
├── studyQueue
├── studyProgress
└── syncState

Mutation
├── register
├── login
├── logout
├── createGroup
├── createCategory
├── createDeck
├── updateDeck
├── publishDeck
├── createCard
├── updateCard
├── deleteCard
├── submitReview
├── syncChanges
└── createReport
```

## 16.2 Example types

``` graphql
type User {
  id: ID!
  displayName: String!
  createdAt: DateTime!
}

type Deck {
  id: ID!
  title: String!
  description: String
  visibility: DeckVisibility!
  publicationStatus: PublicationStatus!
  owner: User!
  cardCount: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Card {
  id: ID!
  deckId: ID!
  position: Int!
  frontContent: String!
  backContent: String!
  metadata: JSON
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

## 16.3 Example queries

``` graphql
query MyDecks($input: DeckListInput) {
  myDecks(input: $input) {
    items {
      id
      title
      description
      cardCount
      updatedAt
    }
    totalCount
    nextCursor
  }
}
```

``` graphql
query PublicDeck($id: ID!) {
  deck(id: $id) {
    id
    title
    description
    publicationStatus
    owner {
      id
      displayName
    }
  }
}
```

## 16.4 Example mutations

``` graphql
mutation CreateDeck($input: CreateDeckInput!) {
  createDeck(input: $input) {
    id
    title
    description
    publicationStatus
  }
}
```

``` graphql
mutation CreateCard($input: CreateCardInput!) {
  createCard(input: $input) {
    id
    deckId
    frontContent
    backContent
  }
}
```

``` graphql
mutation PublishDeck($id: ID!) {
  publishDeck(id: $id) {
    id
    publicationStatus
    publishedAt
  }
}
```

## 16.5 Pagination

Use cursor-based pagination for public discovery and large collections.

Example:

``` graphql
input DeckListInput {
  first: Int
  after: String
  search: String
  categoryId: ID
}
```

Set reasonable maximum page sizes on the server.

## 16.6 Error taxonomy

  Code                 Meaning
  -------------------- ---------------------------------------
  `UNAUTHENTICATED`    Authentication required.
  `FORBIDDEN`          User lacks permission.
  `NOT_FOUND`          Resource is missing or inaccessible.
  `VALIDATION_ERROR`   Input is invalid.
  `CONFLICT`           Resource or synchronization conflict.
  `RATE_LIMITED`       Request limit exceeded.
  `INTERNAL_ERROR`     Unexpected server error.

Do not expose stack traces or SQL errors to clients.

------------------------------------------------------------------------

# 17. Authentication and Security

## 17.1 Initial recommendation

Use server-side sessions for the web application if the deployment
architecture supports it cleanly.

For Tauri desktop and mobile, evaluate a token-based flow with:

-   Short-lived access tokens.
-   Refresh token rotation.
-   Secure platform storage.
-   Explicit revocation.
-   Device/session management.

The final approach should be chosen after validating the client
architecture.

## 17.2 Registration flow

``` text
Client
  │
  ▼
Validate input
  │
  ▼
Normalize email
  │
  ▼
Check account policy
  │
  ▼
Hash password with Argon2id
  │
  ▼
Create user in transaction
  │
  ▼
Create session
  │
  ▼
Return authenticated result
```

## 17.3 Security requirements

-   Use Argon2id.
-   Use secure session cookies where applicable.
-   Protect against CSRF when using cookies.
-   Rate-limit login and registration.
-   Avoid account enumeration.
-   Validate email and password requirements.
-   Use secure secret management.
-   Never log passwords or tokens.
-   Rotate secrets according to operational requirements.
-   Implement logout and session revocation.
-   Test authorization separately from authentication.

------------------------------------------------------------------------

# 18. Offline-First Strategy

## 18.1 First offline milestone

The first offline milestone is:

> Download a published deck, study it without a network connection, save
> review events locally, and synchronize those events later.

Do not initially support offline editing of every community resource.

## 18.2 Data authority

  Data                     Authority
  ------------------------ -----------------------------------------------------
  Published deck content   Server
  Card definitions         Server
  Review events            Generated by user, accepted and validated by server
  Derived study state      Server-authoritative after synchronization
  Cached cards             Client cache
  Pending review queue     Client until accepted
  Sync cursor              Client copy of server state

## 18.3 Client storage

The client needs to store:

``` text
local database
├── cached_decks
├── cached_cards
├── local_progress
├── pending_review_events
├── sync_state
├── client_metadata
└── schema_metadata
```

The exact database technology should be evaluated for Tauri desktop and
mobile compatibility.

Potential approaches:

-   SQLite through a Tauri plugin.
-   A Rust-backed local database layer.
-   IndexedDB for web.
-   A shared abstraction with platform-specific implementations.

Do not assume that IndexedDB is available in the same way inside every
Tauri environment or that one plugin is equally suitable for all
platforms.

------------------------------------------------------------------------

# 19. Synchronization Protocol

## 19.1 Review event model

``` ts
type ReviewEventInput = {
  eventId: string;
  clientId: string;
  cardId: string;
  rating: "again" | "hard" | "good" | "easy";
  reviewedAt: string;
};
```

## 19.2 Synchronization flow

``` text
Client starts
  │
  ▼
Load local queue
  │
  ▼
Check connectivity
  │
  ├── Offline
  │    └── Keep events queued
  │
  └── Online
       │
       ▼
  Upload pending events
       │
       ▼
  Server validates events
       │
       ▼
  Server deduplicates events
       │
       ▼
  Server updates progress
       │
       ▼
  Client receives result
       │
       ▼
  Mark accepted events as synced
```

## 19.3 Synchronization requirements

-   Every event has a unique idempotency key.
-   Duplicate events must not be applied twice.
-   Events must be authenticated.
-   The server verifies card access.
-   The server validates event timestamps.
-   The client can retry safely.
-   The server returns accepted and rejected events.
-   The client can recover from partial failures.
-   Schema versions are tracked.
-   Conflicts are logged and testable.

## 19.4 Suggested GraphQL types

``` graphql
input ReviewEventInput {
  eventId: ID!
  clientId: ID!
  cardId: ID!
  rating: ReviewRating!
  reviewedAt: DateTime!
}

input SyncChangesInput {
  events: [ReviewEventInput!]!
  cursor: String
}

type SyncResult {
  acceptedEventIds: [ID!]!
  rejectedEvents: [SyncRejectedEvent!]!
  changes: [SyncChange!]!
  serverCursor: String!
}
```

This schema is illustrative and should be refined during implementation.

------------------------------------------------------------------------

# 20. Learning and Spaced Repetition

## 20.1 Initial learning mode

Start with a simple study flow:

1.  Select a deck.
2.  Display the front of a card.
3.  Allow the user to reveal the answer.
4.  Ask the user to rate the result.
5.  Record the review event.
6.  Show the next card.

## 20.2 Progress model

Progress belongs to a user, not to the card itself.

``` text
Card: Apple

User A
- Review count: 10
- Due date: Tomorrow

User B
- Review count: 2
- Due date: Today
```

## 20.3 Spaced repetition

Evaluate FSRS rather than inventing a custom algorithm.

Before implementation, define:

-   Rating values.
-   Scheduling behavior.
-   New-card learning steps.
-   Review limits.
-   Time-zone handling.
-   Offline scheduling behavior.
-   How server and client calculate or reconcile state.

The first version can record reviews without implementing a full
scheduling algorithm.

------------------------------------------------------------------------

# 21. Web, Desktop, and Mobile Strategy

## 21.1 Web

The web application should contain:

-   Public landing page.
-   Blog.
-   Authentication pages.
-   Private application.
-   Community discovery.
-   Study interface.
-   Offline support appropriate to browser capabilities.

## 21.2 Tauri desktop

Tauri should provide:

-   Desktop application shell.
-   Native file and storage integrations where needed.
-   Local database access.
-   Offline study.
-   Synchronization.
-   System integration.

Do not move all application logic into Rust. Keep shared learning and
API behavior in reusable TypeScript/domain modules where practical.

## 21.3 Tauri mobile

Tauri mobile requires platform-specific validation.

Consider:

-   Android build environment.
-   iOS build environment.
-   Native permissions.
-   Secure storage.
-   Background synchronization.
-   Push notifications.
-   Performance.
-   App lifecycle handling.
-   Offline database behavior.

Build a minimal mobile prototype before implementing the complete mobile
feature set.

## 21.4 Shared and platform-specific components

Shared:

-   API contract.
-   Domain concepts.
-   Validation rules.
-   Learning behavior.
-   Sync protocol.
-   Authentication contract.

Platform-specific:

-   Navigation.
-   UI layout.
-   Local database integration.
-   Secure storage.
-   Native permissions.
-   Background tasks.
-   Notifications.

------------------------------------------------------------------------

# 22. Markdown Blog Architecture

## 22.1 Directory structure

``` text
content/
└── blog/
    ├── english-learning/
    │   └── common-english-verbs.md
    ├── french-learning/
    │   └── beginner-french-vocabulary.md
    └── product/
        └── introducing-docard.md
```

## 22.2 Frontmatter

``` yaml
---
title: "Common English Verbs"
description: "Learn frequently used English verbs."
slug: "common-english-verbs"
category: "English Learning"
tags:
  - English
  - Vocabulary
publishedAt: "2026-09-25"
draft: true
---
```

## 22.3 Blog requirements

-   Markdown rendering.
-   Frontmatter validation.
-   Draft support.
-   Slug generation.
-   Category and tag support.
-   SEO metadata.
-   Sitemap support.
-   Accessible typography.
-   Syntax highlighting if technical articles are published.
-   Safe HTML handling.

Use Nuxt Content if it satisfies the project requirements. A custom
Markdown pipeline is an alternative if you need more control.

Community-generated Markdown must be treated as untrusted input and
sanitized before rendering.

------------------------------------------------------------------------

# 23. Testing Strategy

## 23.1 Unit tests

Test:

-   Validation schemas.
-   Permission rules.
-   Publication state transitions.
-   Review event validation.
-   Scheduling logic.
-   Cursor handling.
-   Error mapping.

## 23.2 Integration tests

Test:

-   Database queries.
-   Transactions.
-   Foreign key constraints.
-   Unique constraints.
-   Authentication persistence.
-   Repository behavior.
-   Synchronization transactions.

## 23.3 API tests

Test:

-   Registration.
-   Login.
-   Logout.
-   Unauthorized access.
-   Owner access.
-   Public deck access.
-   Deck creation.
-   Card creation.
-   Publication.
-   Reporting.
-   Synchronization.

## 23.4 Offline tests

Test:

-   Local event persistence.
-   App restart recovery.
-   Duplicate event submission.
-   Partial upload failure.
-   Rejected event handling.
-   Network recovery.
-   Schema migration.
-   Local cache invalidation.

## 23.5 End-to-end scenario

``` text
Register
  → Login
  → Create group
  → Create category
  → Create deck
  → Add cards
  → Publish deck
  → Download deck
  → Go offline
  → Study cards
  → Record reviews
  → Reconnect
  → Synchronize
  → Verify server progress
```

------------------------------------------------------------------------

# 24. Observability and Operations

## 24.1 Logging

Use structured logs for:

-   Request identifiers.
-   User identifiers where appropriate and privacy-safe.
-   GraphQL operation names.
-   Database errors.
-   Authentication events.
-   Synchronization failures.
-   Moderation actions.

Never log:

-   Passwords.
-   Raw session tokens.
-   Refresh tokens.
-   Sensitive personal data.
-   Full private card content without a clear operational reason.

## 24.2 Health checks

Provide:

-   Application health endpoint.
-   Database connectivity check.
-   Version information.
-   Readiness check for deployment.
-   Graceful shutdown handling.

## 24.3 Backups

Production requirements:

-   Automated PostgreSQL backups.
-   Tested restore process.
-   Backup retention policy.
-   Monitoring for failed backups.
-   Migration rollback or recovery procedures.

------------------------------------------------------------------------

# 25. Development Roadmap

## Phase 0 --- Repository assessment

Deliverables:

-   Inspect existing repository.
-   Identify existing applications.
-   Review package versions.
-   Review current database setup.
-   Identify architectural gaps.
-   Document current state.

## Phase 1 --- Foundation

Deliverables:

-   Monorepo configuration.
-   Backend application.
-   PostgreSQL connection.
-   ORM and migration setup.
-   Initial schema.
-   GraphQL server.
-   Test configuration.
-   Environment configuration.

## Phase 2 --- Authentication

Deliverables:

-   User registration.
-   Login.
-   Logout.
-   Session handling.
-   Password hashing.
-   Authentication context.
-   Authorization tests.

## Phase 3 --- Core content

Deliverables:

-   Groups.
-   Categories.
-   Decks.
-   Cards.
-   Drafts.
-   Publication state.
-   Ownership rules.
-   Public deck browsing.

## Phase 4 --- Learning

Deliverables:

-   Study sessions.
-   Review events.
-   Basic progress.
-   Study queue.
-   Learning API.
-   Tests.

## Phase 5 --- Offline MVP

Deliverables:

-   Local storage.
-   Deck downloads.
-   Offline study.
-   Local review queue.
-   Idempotent sync.
-   Retry handling.
-   Conflict handling.

## Phase 6 --- Web and blog

Deliverables:

-   Landing page.
-   Application UI.
-   Markdown blog.
-   SEO.
-   Responsive design.
-   Accessibility improvements.

## Phase 7 --- Tauri

Deliverables:

-   Desktop shell.
-   Local database integration.
-   Native secure storage.
-   Offline learning.
-   Synchronization.
-   Android prototype.
-   iOS validation.

## Phase 8 --- Community expansion

Deliverables:

-   Reports.
-   Moderation dashboard.
-   Deck versioning.
-   Discovery improvements.
-   Deck cloning.
-   Community profiles.
-   Advanced learning features.

------------------------------------------------------------------------

# 26. First Implementation Sprint

The first sprint should establish the foundation and prove one complete
vertical slice.

## Sprint tasks

-   [ ] Inspect the repository.
-   [ ] Review existing package configuration.
-   [ ] Establish or refine workspace structure.
-   [ ] Configure TypeScript.
-   [ ] Configure Vitest.
-   [ ] Configure PostgreSQL.
-   [ ] Choose Drizzle or another database access tool.
-   [ ] Create initial migration.
-   [ ] Implement users table.
-   [ ] Implement groups, categories, decks, and cards tables.
-   [ ] Set up GraphQL schema.
-   [ ] Set up request context.
-   [ ] Implement registration.
-   [ ] Implement login.
-   [ ] Implement deck creation.
-   [ ] Implement card creation.
-   [ ] Add authorization tests.
-   [ ] Document architecture decisions.

## Sprint acceptance criteria

A user can:

1.  Register.
2.  Log in.
3.  Create a group.
4.  Create a category.
5.  Create a deck.
6.  Add a card.
7.  Retrieve the deck through GraphQL.
8.  Access only authorized content.
9.  Run the test suite successfully.

Offline synchronization does not need to be complete in this sprint, but
the database and service boundaries must not make it unnecessarily
difficult to add later.

------------------------------------------------------------------------

# 27. Definition of Done

A feature is complete when:

-   Requirements are documented.
-   Input validation exists.
-   Authorization is implemented.
-   Database migrations are included.
-   Unit tests cover important business rules.
-   Integration tests cover database behavior where necessary.
-   GraphQL behavior is tested.
-   Errors are handled consistently.
-   Documentation is updated.
-   The feature works locally.
-   No secrets are committed.
-   The implementation does not introduce unnecessary coupling.

For synchronization features, additionally require:

-   Idempotency tests.
-   Retry tests.
-   Offline persistence tests.
-   Conflict or rejection handling.
-   Schema version handling.

------------------------------------------------------------------------

# 28. Risks and Trade-offs

## 28.1 Community content increases complexity

Public content requires:

-   Moderation.
-   Reporting.
-   Ownership.
-   Abuse prevention.
-   Content lifecycle management.
-   Potential versioning.

Start with owner-controlled publishing and basic reports. Add
collaboration later.

## 28.2 Early offline support increases design requirements

Offline support affects:

-   Database modeling.
-   Client storage.
-   Review event processing.
-   Conflict handling.
-   Versioning.
-   Authentication.
-   Testing.

Start with offline study and review events, not complete offline
editing.

## 28.3 Tauri mobile compatibility

Desktop and mobile have different platform constraints.

Validate:

-   Local storage.
-   Secure storage.
-   Background behavior.
-   Build tooling.
-   Native integrations.
-   Application lifecycle.

Do not assume that desktop functionality automatically works on mobile.

## 28.4 GraphQL complexity

GraphQL introduces:

-   Schema management.
-   Resolver organization.
-   Authorization concerns.
-   Query complexity.
-   Potential N+1 queries.
-   Caching decisions.

Use a modular schema and enforce query limits where necessary.

## 28.5 PostgreSQL schema evolution

The schema will evolve as the learning and community models become
clearer.

Use migrations and avoid manual production changes. Define deletion,
archiving, and versioning behavior before implementing destructive
operations.

------------------------------------------------------------------------

# 29. Open Decisions

These decisions should be finalized before implementing the full system.

  -----------------------------------------------------------------------
  Decision                Options                 Recommended Next Step
  ----------------------- ----------------------- -----------------------
  Database access         Drizzle, Prisma,        Compare based on
                          SQL-first               TypeScript experience
                                                  and migration
                                                  requirements.

  Authentication          Sessions, JWT, hybrid   Prototype web and Tauri
                                                  authentication flows.

  Offline database        SQLite, IndexedDB,      Validate cross-platform
                          Rust-backed storage     support.

  Offline editing         Study only, full        Start with study-only
                          editing                 offline support.

  Community editing       Owner-only,             Start with owner-only
                          collaborative           editing.

  Learning algorithm      Basic reviews, FSRS     Start with review
                                                  events and basic
                                                  progress.

  Media                   Text-only, images/audio Start text-only unless
                                                  media is core to the
                                                  MVP.

  Blog                    Nuxt Content, custom    Start with Nuxt Content
                          Markdown pipeline       if requirements fit.

  Search                  PostgreSQL search,      Start with PostgreSQL
                          external search         capabilities.

  Background sync         Manual, periodic, OS    Start with sync on app
                          background task         open and reconnect.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 30. Practical Starting Checklist

Follow this order when beginning implementation.

## Step 1 --- Inspect the repository

Review:

``` text
package.json
pnpm-workspace.yaml
apps/
server/
packages/
nuxt.config.ts
tsconfig.json
README.md
```

Identify what already exists before creating new architecture.

## Step 2 --- Freeze the initial technology decisions

Decide:

-   Drizzle or Prisma.
-   Express or another HTTP server.
-   Apollo Server or another GraphQL server.
-   Session authentication or token authentication.
-   Initial local storage strategy.
-   Nuxt Content or custom Markdown pipeline.

Do not add all candidate packages before making these decisions.

## Step 3 --- Create the database foundation

Implement:

-   PostgreSQL connection.
-   Migration tooling.
-   Users.
-   Groups.
-   Categories.
-   Decks.
-   Cards.

Run migrations on a clean database and test foreign keys.

## Step 4 --- Implement authentication

Implement:

-   Registration.
-   Login.
-   Logout.
-   Session or token validation.
-   Authentication context.
-   Authorization helpers.

Test unauthorized access before implementing community features.

## Step 5 --- Implement core GraphQL operations

Start with:

``` text
me
createGroup
createCategory
createDeck
myDecks
createCard
updateCard
```

Then add publication and public discovery.

## Step 6 --- Build the basic study flow

Implement:

-   Deck selection.
-   Card presentation.
-   Answer reveal.
-   Review rating.
-   Review event persistence.
-   Basic progress.

## Step 7 --- Add offline support

Implement:

-   Local deck cache.
-   Local review event queue.
-   Idempotency.
-   Synchronization endpoint.
-   Retry behavior.

## Step 8 --- Build the public website and blog

Implement:

-   Landing page.
-   Blog index.
-   Article page.
-   SEO.
-   About and support pages.

## Step 9 --- Integrate Tauri

Start with the desktop client and validate:

-   Authentication.
-   API access.
-   Local storage.
-   Offline study.
-   Synchronization.

Then validate mobile targets.

------------------------------------------------------------------------

# 31. Claude Implementation Prompt

You are the lead software architect and senior full-stack engineer for
DoCard.

## Project

DoCard is a community-driven learning platform for flashcards,
vocabulary, glossaries, and educational materials.

Repository:

`SoftEng-Islam/doCard`

## Confirmed decisions

-   PostgreSQL.
-   GraphQL.
-   Community content ownership.
-   Early offline support.
-   Rust + Tauri for desktop and mobile.
-   Markdown blog.
-   Modular monolith backend.
-   Nuxt + Vue + TypeScript for web.
-   Zod for validation.
-   Vitest for testing.
-   pnpm for package management.

## Main responsibilities

Help me design and implement a secure, maintainable, scalable backend
and cross-platform architecture.

## Required approach

1.  Inspect the repository before making major changes.
2.  Identify existing architecture and dependencies.
3.  Use PostgreSQL as the primary database.
4.  Keep GraphQL resolvers thin.
5.  Put business logic in application services.
6.  Use repositories for database access.
7.  Enforce authorization server-side.
8.  Use migrations.
9.  Design offline synchronization around idempotent review events.
10. Avoid unnecessary dependencies.
11. Explain architectural decisions and trade-offs.
12. Implement incrementally.
13. Write tests for critical business logic.
14. Avoid rewriting working code without justification.

## Product requirements

Users should be able to:

-   Register and log in.
-   Create groups, categories, decks, and cards.
-   Save drafts.
-   Publish community decks.
-   Browse public decks.
-   Study cards.
-   Download decks for offline use.
-   Record reviews offline.
-   Synchronize reviews after reconnecting.
-   Report inappropriate content.

## First task

Inspect the existing repository and produce an evidence-based
architecture assessment.

Include:

1.  Current repository structure.
2.  Existing technologies.
3.  Existing frontend and backend implementation.
4.  Existing database configuration.
5.  Existing authentication.
6.  Existing GraphQL implementation.
7.  Architectural gaps.
8.  Recommended first implementation milestone.
9.  Risks and trade-offs.
10. Proposed file changes for the first milestone.

Do not implement the entire system immediately. First inspect, explain,
and propose the smallest practical next step.

------------------------------------------------------------------------

# Final Recommendation

Start with the repository assessment, then build the foundation around:

1.  PostgreSQL and migrations.
2.  Authentication.
3.  Groups, categories, decks, and cards.
4.  GraphQL API.
5.  Basic study and review events.
6.  Early offline storage and synchronization.
7.  Community publishing and moderation.
8.  Tauri integration.

The most important architectural constraint is to keep **server-owned
content, user-owned learning state, and client-side cached data
separate**. This separation will make community sharing, offline study,
and cross-platform synchronization significantly easier to maintain.
