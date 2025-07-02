# Design System

This directory contains a token-driven, Tailwind-compatible design system for scalable, maintainable UI development.

## Structure

- `/tokens` — Design tokens (colors, spacing, radii, typography, shadows) as JSON files
- `/components` — UI primitives (see full list below)
- `/tailwind.preset.ts` — Tailwind preset for easy import and reuse
- `/utils` — Shared utilities (optional)

## Components

- **Accordion** — Expand/collapse content panels
- **Alert** — Status banners for success, error, info, warning
- **Appbar** — Top navigation/header bar
- **Banner** — Full-width announcement banner
- **Button** — Token-driven button with variants and sizes
- **Card** — Simple content container with optional shadow
- **Checkbox** — Accessible checkbox input
- **CustomSelect** — Accessible custom select dropdown
- **Input** — Token-driven text input
- **Search** — Search input with clear button
- **Select** — Styled native select input
- **Spinner** — Loading spinner
- **Tag** — Status/label pill with variants
- **ThemeToggle** — Light/dark mode toggle
- **Tooltip** — Accessible tooltip

## Usage in Other Projects

1. **Copy or install this directory as a package** (e.g., `@your-org/design-system`).
2. **In your project's `tailwind.config.js`:**
   ```js
   module.exports = require('./path-to/design-system/tailwind.preset');
   ```
3. **Use token-driven Tailwind classes** in your components (e.g., `bg-primary`, `rounded-lg`, `text-base`).
4. **For dark mode:**
   - Use Tailwind's `dark:` variant (e.g., `bg-background dark:bg-background-dark`).
   - Add/remove the `dark` class on `<html>` or `<body>` to toggle dark mode.

## Example Usage

```tsx
import Button from './components/Button';
import Alert from './components/Alert';
import Appbar from './components/Appbar';
import Banner from './components/Banner';
import Tag from './components/Tag';
import Spinner from './components/Spinner';

<Button variant="primary">Primary</Button>
<Alert severity="success">Action was successful!</Alert>
<Appbar title="My App" />
<Banner title="Free shipping on 4th of July" />
<Tag variant="success">New</Tag>
<Spinner />
```

## Updating the Theme
- Change any value in the `/tokens` JSON files to update the theme globally.
- All Tailwind utilities and components will reflect the new values automatically.

## Example Directory
```
design-system/
  tokens/
    colors.json
    spacing.json
    radii.json
    typography.json
    shadows.json
  components/
    Button.tsx
    Input.tsx
    ...
  tailwind.preset.ts
  README.md
```

## Best Practices
- Use only token-driven Tailwind classes in your UI.
- Use `darkMode: 'class'` and Tailwind's `dark:` variant for dark theme support.
- Keep all design decisions in tokens for easy maintenance and exportability. 