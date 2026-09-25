
#!/usr/bin/env bash

set -Eeuo pipefail

# ============================================================
# DoCard - Initialize pnpm Workspace
# ============================================================

PROJECT_ROOT="$(pwd)"

echo "Initializing DoCard pnpm workspace..."
echo "Root: $PROJECT_ROOT"
echo

# ------------------------------------------------------------
# Helpers
# ------------------------------------------------------------

write_file() {
  local file="$1"
  local content="$2"

  mkdir -p "$(dirname "$PROJECT_ROOT/$file")"

  if [[ -f "$PROJECT_ROOT/$file" ]]; then
    echo "SKIP: $file already exists"
    return
  fi

  printf '%s\n' "$content" > "$PROJECT_ROOT/$file"
  echo "CREATE: $file"
}

# ------------------------------------------------------------
# 1. Workspace configuration
# ------------------------------------------------------------

write_file "pnpm-workspace.yaml" \
'packages:
  - "apps/*"
  - "packages/*"
  - "server"'

# ------------------------------------------------------------
# 2. Root package.json
# ------------------------------------------------------------

write_file "package.json" \
'{
  "name": "docard",
  "version": "0.1.0",
  "private": true,
  "description": "DoCard - Learning and flashcard platform",
  "scripts": {
    "dev": "pnpm --parallel --filter @docard/web --filter @docard/server dev",
    "dev:web": "pnpm --filter @docard/web dev",
    "dev:server": "pnpm --filter @docard/server dev",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "format": "pnpm exec prettier --write ."
  },
  "packageManager": "pnpm@12",
  "engines": {
    "node": ">=22"
  },
  "devDependencies": {
    "prettier": "^3.6.2",
    "typescript": "^5.9.2"
  }
}'

# ------------------------------------------------------------
# 3. Backend package
# ------------------------------------------------------------

write_file "server/package.json" \
'{
  "name": "@docard/server",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint ."
  }
}'

# ------------------------------------------------------------
# 4. Web application package
# ------------------------------------------------------------

write_file "apps/web/package.json" \
'{
  "name": "@docard/web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "typecheck": "nuxt typecheck",
    "lint": "eslint ."
  }
}'

# ------------------------------------------------------------
# 5. Desktop application package
# ------------------------------------------------------------

write_file "apps/desktop/package.json" \
'{
  "name": "@docard/desktop",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "echo \"Desktop app not configured yet\"",
    "build": "echo \"Desktop app not configured yet\""
  }
}'

# ------------------------------------------------------------
# 6. Mobile application package
# ------------------------------------------------------------

write_file "apps/mobile/package.json" \
'{
  "name": "@docard/mobile",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "echo \"Mobile app not configured yet\"",
    "build": "echo \"Mobile app not configured yet\""
  }
}'

# ------------------------------------------------------------
# 7. Shared packages
# ------------------------------------------------------------

write_file "packages/api-client/package.json" \
'{
  "name": "@docard/api-client",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  }
}'

write_file "packages/shared-types/package.json" \
'{
  "name": "@docard/shared-types",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  }
}'

write_file "packages/validation/package.json" \
'{
  "name": "@docard/validation",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  }
}'

write_file "packages/config/package.json" \
'{
  "name": "@docard/config",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  }
}'

# ------------------------------------------------------------
# 8. Create source entry points
# ------------------------------------------------------------

write_file "packages/api-client/src/index.ts" \
'export {};'

write_file "packages/shared-types/src/index.ts" \
'export {};'

write_file "packages/validation/src/index.ts" \
'export {};'

write_file "packages/config/src/index.ts" \
'export {};'

# ------------------------------------------------------------
# 9. Create TypeScript configuration
# ------------------------------------------------------------

write_file "server/tsconfig.json" \
'{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "tests"]
}'

# ------------------------------------------------------------
# 10. Install workspace dependencies
# ------------------------------------------------------------

echo
echo "Installing workspace dependencies..."
pnpm install

echo
echo "Workspace initialization complete!"
echo

# ------------------------------------------------------------
# 11. Show workspace packages
# ------------------------------------------------------------

echo "Workspace packages:"
pnpm list --depth -1 --recursive || true

echo
echo "Next steps:"
echo "  1. Configure Nuxt in apps/web"
echo "  2. Install backend dependencies"
echo "  3. Configure TypeScript and GraphQL"
echo "  4. Set up PostgreSQL and Drizzle"