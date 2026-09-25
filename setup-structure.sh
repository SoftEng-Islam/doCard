#!/usr/bin/env bash

set -Eeuo pipefail

# ============================================================
# DoCard - Project Structure Setup
# ============================================================

PROJECT_ROOT="$(pwd)"

echo "Setting up DoCard project structure..."
echo "Root: $PROJECT_ROOT"
echo

# ------------------------------------------------------------
# 1. Directory structure
# ------------------------------------------------------------

directories=(
  # Applications
  "apps/web"
  "apps/desktop"
  "apps/mobile"

  # Shared packages
  "packages/api-client"
  "packages/shared-types"
  "packages/validation"
  "packages/config"

  # Backend
  "server/src/config"
  "server/src/db/schema"
  "server/src/db/migrations"

  # GraphQL
  "server/src/graphql/directives"

  # Backend modules
  "server/src/modules/auth"
  "server/src/modules/users"
  "server/src/modules/groups"
  "server/src/modules/categories"
  "server/src/modules/decks"
  "server/src/modules/cards"
  "server/src/modules/learning"
  "server/src/modules/sync"

  # Backend infrastructure
  "server/src/middleware"
  "server/src/errors"
  "server/src/utils"

  # Backend tests
  "server/tests"
)

for dir in "${directories[@]}"; do
  mkdir -p "$PROJECT_ROOT/$dir"
done

# ------------------------------------------------------------
# 2. Backend files
# ------------------------------------------------------------

files=(
  # Root
  "README.md"
  ".gitignore"
  "pnpm-workspace.yaml"

  # Backend entry points
  "server/src/app.ts"
  "server/src/server.ts"

  # Configuration
  "server/src/config/env.ts"
  "server/src/config/constants.ts"

  # Database
  "server/src/db/client.ts"

  # GraphQL
  "server/src/graphql/schema.ts"
  "server/src/graphql/context.ts"

  # Authentication
  "server/src/modules/auth/auth.service.ts"
  "server/src/modules/auth/auth.repository.ts"
  "server/src/modules/auth/auth.schema.ts"

  # Users
  "server/src/modules/users/users.service.ts"
  "server/src/modules/users/users.repository.ts"
  "server/src/modules/users/users.schema.ts"

  # Groups
  "server/src/modules/groups/groups.service.ts"
  "server/src/modules/groups/groups.repository.ts"
  "server/src/modules/groups/groups.schema.ts"

  # Categories
  "server/src/modules/categories/categories.service.ts"
  "server/src/modules/categories/categories.repository.ts"
  "server/src/modules/categories/categories.schema.ts"

  # Decks
  "server/src/modules/decks/decks.service.ts"
  "server/src/modules/decks/decks.repository.ts"
  "server/src/modules/decks/decks.schema.ts"

  # Cards
  "server/src/modules/cards/cards.service.ts"
  "server/src/modules/cards/cards.repository.ts"
  "server/src/modules/cards/cards.schema.ts"

  # Learning
  "server/src/modules/learning/learning.service.ts"
  "server/src/modules/learning/learning.repository.ts"
  "server/src/modules/learning/learning.schema.ts"

  # Synchronization
  "server/src/modules/sync/sync.service.ts"
  "server/src/modules/sync/sync.repository.ts"
  "server/src/modules/sync/sync.schema.ts"

  # Error handling
  "server/src/errors/index.ts"

  # Testing
  "server/tests/setup.ts"
)

for file in "${files[@]}"; do
  mkdir -p "$PROJECT_ROOT/$(dirname "$file")"
  touch "$PROJECT_ROOT/$file"
done

# ------------------------------------------------------------
# 3. Create placeholder files for empty directories
# ------------------------------------------------------------

# Git does not track empty directories.
# Keep important empty directories in the repository.

touch \
  "$PROJECT_ROOT/server/src/db/schema/.gitkeep" \
  "$PROJECT_ROOT/server/src/db/migrations/.gitkeep" \
  "$PROJECT_ROOT/server/src/graphql/directives/.gitkeep" \
  "$PROJECT_ROOT/server/src/middleware/.gitkeep" \
  "$PROJECT_ROOT/server/src/utils/.gitkeep" \
  "$PROJECT_ROOT/packages/api-client/.gitkeep" \
  "$PROJECT_ROOT/packages/shared-types/.gitkeep" \
  "$PROJECT_ROOT/packages/validation/.gitkeep" \
  "$PROJECT_ROOT/packages/config/.gitkeep"

# ------------------------------------------------------------
# 4. Print the created structure
# ------------------------------------------------------------

echo
echo "DoCard structure created successfully!"
echo

if command -v tree >/dev/null 2>&1; then
  tree -a -I '.git'
else
  find . \
    -path './.git' -prune -o \
    -path './node_modules' -prune -o \
    -print | sort
fi

echo
echo "Next step: Review the structure before adding implementation code."