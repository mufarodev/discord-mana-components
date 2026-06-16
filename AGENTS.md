# AGENTS.md

## Project

`discord-mana-ui` is a strictly typed SvelteKit library project for Svelte 5 components. It uses Svelte runes, Bits UI v2, Tailwind CSS, `tailwind-variants`, `clsx`, and `tailwind-merge`.

## Architecture

- Keep components headless-compatible and composable.
- Prefer native HTML semantics before adding abstractions.
- Type component props with `svelte/elements` and Svelte `Snippet` where children are supported.
- Export public APIs from `src/lib/index.ts`.
- Place components under `src/lib/components/<name>/<name>.svelte`.
- Keep reusable utilities in `src/lib`.

## Svelte

- Use Svelte 5 runes and Svelte 5 component patterns.
- Do not use legacy Svelte 4 event forwarding or slot patterns in new components.
- Destructure props through `$props()` with explicit TypeScript types.
- Preserve native attributes and events when wrapping platform elements.

## Styling

- Use `cn` from `$lib/utils` for class composition.
- Use `tailwind-variants` for variants when styling is introduced.
- Do not add custom colors, fonts, or theme tokens without a product requirement.
- Keep unstyled components truly unstyled unless the task requests styling.

## Quality

- Run `pnpm check` after component or TypeScript changes.
- Run `pnpm build` before committing package setup or public API changes.
- Keep changes minimal and type-safe.
- Do not add comments unless they explain non-obvious behavior.
