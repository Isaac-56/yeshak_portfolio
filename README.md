# Yeshak — Motion Portfolio / Revised

An original personal portfolio taking inspiration from premium interaction patterns: restrained typography, route-curtain transitions, reveal choreography, magnetic interactions, a theme-responsive cinematic hero, a full-screen rounded-edge menu, and film-quality project presentations.

## Start

```sh
npm install
npm run dev
```

## Validation

```sh
npm run build
```

The project contains 229 extracted Figma pages in seven case studies and three carefully encoded full-HD (1920×1080) project videos. The optional 4K file pack contains 3840×2160 Lanczos-upscaled versions that can be selected on large screens after extraction; **these are upscales, not native 4K captures**, and cannot recover missing source detail.

To enable the optional 4K video quality button, extract `Yeshak_Portfolio_4K_Optional.zip` into this folder, preserving `public/projects/..` paths. Otherwise the player uses full-HD automatically.

## Theme alignment

Both homepage backgrounds are derived from the same 1536×1024 photograph so the silhouette, head/neck tilt and outfit **remain perfectly registered** during the theme crossfade. Dark mode is stylized through color/painterly grading rather than a different posed illustration. The About portrait preserves the pixels of the original supplied illustration, with the floating labels removed outside the face area.

## Publishing

The project is provided as a separate code package for review. It is not publicly deployed, and no changes to GitHub `main` are made.
