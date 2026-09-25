# DoCard Architecture

%%{init: {
  'theme': 'dark',
  'themeVariables': {
    'primaryColor': '#007acc',
    'edgeLabelBackground':'#121212',
    'tertiaryColor': '#1e1e1e'
  }
}%%}

```mermaid
flowchart TD
    subgraph DoCardArchitecture ["DoCard Architecture"]
        direction TB

        titleNode["DoCard Architecture"]
        badgeNode["Proposed"]

        L1["Client Applications<br/>Nuxt Web (Nuxt 3) · Tauri Desktop & Mobile (Rust)"]
        L2["API & Authentication<br/>GraphQL (Nitro) · Argon2id Hashing · Zod Validation"]
        L3["Application Services<br/>Users · Decks · Cards · SRS Learning (SM-2) · Delta Sync"]
        L4["Data Access Layer (Drizzle ORM)<br/>Repositories · Transactions · Migrations"]

        L1 --> L2
        L2 --> L3
        L3 --> L4

        subgraph StorageLayer ["Storage Layer"]
            direction LR
            L5pg["PostgreSQL<br/>Primary Application Data"]
            L5storage["Object Storage (S3/R2)<br/>Images and Audio Assets"]
        end

        L4 --> L5pg
        L4 --> L5storage
    end

    classDef darkbox fill:#1e1e1e,stroke:#444,color:#eee,stroke-width:1px,rx:5,ry:5,font-family:monospace
    classDef title fill:none,stroke:none,color:#fff,font-weight:bold,font-size:20px
    classDef badge fill:#111,stroke:#007acc,color:#eee,rx:3,ry:3

    class L1,L2,L3,L4,L5pg,L5storage darkbox
    class titleNode title
    class badgeNode badge
