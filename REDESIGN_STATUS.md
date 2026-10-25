# Editorial Portfolio Redesign — review branch

This is a separate development branch. Do not deploy or merge without explicit approval.

## Reference and experience
- Editorial/immersive direction inspired by Dennis Snellenberg: large typographic hero, quiet navigation, spacious white/charcoal sections, immersive portrait and sophisticated motion.
- Original implementation's bright project graphics and links directly to Figma have been replaced.
- Work tiles link to **internal** `/projects/:slug` pages.
- Each case-study page includes a large cover, overview, real project snapshot slots, click-to-enlarge image lightbox, and next-project navigation.
- Homepage shows selected work; /projects shows the full project index.
- Light/dark mode remains, with contrast-aware navigation.

## Images (required for finished previews)
15 authentic optimized design-screen images, grouped across six projects, are in **Portfolio_Ready_Figma_Assets.zip** (provided separately in chat). Place its included `public/projects` folder at the repository root. Required paths look like `public/projects/module-4/01.webp`.

The ZIP has **not been committed** to GitHub. The case study routes render the images once copied into those paths; without them visitors will see broken-image markers.

## Local preview
```powershell
git pull origin redesign/premium-portfolio-2026
npm install
npm run dev
```
Unzip the design assets into the repository root preserving paths, then visit `http://localhost:5173/`.

## Review checklist
- `npm run build` and `npm run typecheck` must succeed.
- Check desktop and mobile appearance, hover, keyboard and theme toggles.
- Verify all 15 design images load from `/projects/.../NN.webp`.
- Contact form delivery should be end-to-end tested.
- No public deployment or main-branch merge has been made.
