# Task 2: Base Layout — Body, Shell, Header, Sidebar

**Files:**
- Modify: `app/globals.css` (body, header, nav sections)

## What to Do

Update the body background, header styling, brand mark, and sidebar nav to use the new purple palette.

## Changes

**1. Body background** — lines ~21-36. Replace with purple-tinted gradient:

```css
body {
  margin: 0;
  background:
    linear-gradient(90deg, rgba(148, 93, 200, 0.04) 1px, transparent 1px),
    linear-gradient(rgba(96, 214, 231, 0.025) 1px, transparent 1px),
    radial-gradient(circle at top left, rgba(148, 93, 200, 0.1), transparent 30rem),
    radial-gradient(circle at top right, rgba(96, 214, 231, 0.07), transparent 28rem),
    var(--bg);
  background-size: 72px 72px, 72px 72px, auto, auto, auto;
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

**2. Header background** — update `.header` background to use new bg:

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
  padding: 0.9rem 1.25rem;
  background: rgba(19, 19, 22, 0.88);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 20;
}
```

**3. Header status badge** — update `.header-status` gold → purple:

```css
.header-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(148, 93, 200, 0.26);
  border-radius: 999px;
  padding: 0.45rem 0.7rem;
  background: var(--accent-soft);
  color: #c8a8e6;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}
```

**4. Brand mark** — update `.brand-mark` gold → purple:

```css
.brand-mark {
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(148, 93, 200, 0.5);
  border-radius: 0.55rem;
  background:
    linear-gradient(135deg, transparent 42%, rgba(148, 93, 200, 0.9) 43%, rgba(148, 93, 200, 0.9) 56%, transparent 57%),
    linear-gradient(135deg, #1A1A1E, #2E2E35);
  box-shadow: 0 0 32px rgba(148, 93, 200, 0.28);
}
```

**5. Sidebar nav** — update `.command-rail` and nav-item styles:

```css
.command-rail {
  position: sticky;
  top: 4rem;
  align-self: start;
  height: calc(100vh - 4rem);
  border-right: 1px solid var(--border);
  padding: 1rem;
  background: var(--panel);
}

/* Keep rail-label as-is */

.nav-item:hover,
.nav-item:focus-visible {
  border-color: var(--border-strong);
  background: rgba(148, 93, 200, 0.07);
  outline: 0;
}

.nav-item[aria-current="page"] {
  border-color: rgba(148, 93, 200, 0.58);
  background: linear-gradient(90deg, rgba(148, 93, 200, 0.18), rgba(96, 214, 231, 0.055));
  box-shadow: inset 3px 0 0 var(--accent);
}

.nav-item[aria-current="page"] span {
  color: #c8a8e6;
}
```

All other properties in these blocks should remain unchanged.

## Verification

Run `npm run build` — must compile with no errors.

## Commit

`git add app/globals.css && git commit -m "feat: update layout styles to purple palette"`
