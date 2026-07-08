# Task 1: CSS Design Tokens — Update All Variables

**Files:**
- Modify: `app/globals.css:1-19` (CSS custom properties)

## What to Do

Replace the `:root` CSS custom properties block in `app/globals.css` with the new Kromatika-inspired purple palette.

## Exact Code

Replace the entire `:root` block with:

```css
:root {
  color-scheme: dark;
  --bg: #131316;
  --panel: #1A1A1E;
  --panel-soft: #242429;
  --panel-strong: #2E2E35;
  --border: #373742;
  --border-strong: #4A4A57;
  --text: #FFFFFF;
  --muted: #C3C5CB;
  --faint: #8F96AC;
  --accent: #945DC8;
  --accent-soft: rgba(148, 93, 200, 0.15);
  --cyan: #60d6e7;
  --success: #27AE60;
  --danger: #FF4343;
  --radius: 1rem;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
}
```

## Verification

Run `npm run build` — must compile successfully with no errors.

## Commit

Stage `app/globals.css` and commit with message: `feat: update CSS tokens to purple Kromatika palette`
