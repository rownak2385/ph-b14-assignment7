# BazarDor Development Instructions

These instructions apply to all work in this repository.

1. Treat the original `README.md` as the assignment source of truth.
2. Preserve the supplied PNG, Figma, and Penpot design assets. Do not replace or alter them unless the user explicitly requests it.
3. Use the Next.js App Router with strict TypeScript.
4. Prefer small, reusable components with clear responsibilities and typed props.
5. Keep the interface responsive, keyboard-accessible, semantic, and usable on mobile, tablet, and desktop.
6. Support Bengali content, typography, and Bengali numerical formatting where the assignment calls for it.
7. Use the external BazarDor product API documented in the assignment README.
8. Never fabricate product names, prices, market values, API responses, or schemas. Verify them against the API.
9. Preserve previously implemented behavior while adding later phases.
10. Never place secrets or credentials in Git. Update `.env.example` with placeholders when configuration changes.
11. Keep `/prompts/` ignored by Git permanently. Prompt files are local instructions and must never be staged or committed.
12. Implement only the requested phase; do not add future-phase features prematurely.
13. Run the relevant lint, type, test, and production-build checks before reporting completion.
14. Do not automatically stage, commit, or push changes.


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
