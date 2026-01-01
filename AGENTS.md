# AGENTS.md

## Commands
- **Dev server**: `pnpm dev`
- **Build**: `pnpm build` (production build to `dist/`)
- **Preview build**: `pnpm serve`
- **Lint**: `pnpm check` (uses Biome, no fixes)
- **Lint & format**: `pnpm check:fix` (uses Biome, auto-fixes)
- **Typecheck**: `pnpm typecheck`

## Code Style
- **Framework**: SolidJS with TypeScript (strict mode)
- **Formatting**: Biome (single quotes, space indentation, organize imports on save)
- **Styling**: Tailwind CSS v4
- **Naming**: PascalCase for components, camelCase for functions/variables, snake_case for files
- **Imports**: Use type imports (`import type { ... }`) where appropriate
- **Comments**: Do NOT add comments unless explicitly requested
- **Assertions**: Use `// biome-ignore` for intentional violations, add explanatory comments
- **Errors**: Throw descriptive errors with context
