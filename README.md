# Yeshak — Motion Portfolio V3 / GitHub review branch

This is the standalone V3 React portfolio. No files in the default `main` branch were changed.

## Get it in VS Code

```powershell
cd C:\Projects\yeshak_portfolio
git fetch origin
git switch redesign/portfolio-v3-review
npm install
npm run dev
```

If you have uncommitted local changes, stash or commit them before switching branches.
`npm install` automatically restores the genuine Figma design screens, both light/dark hero images, About portrait and three Full HD web-preview videos from versioned `media/images/*.jsonl` and `media/videos/*.jsonl` packs. No separate ChatGPT ZIP download is needed.

Use `npm run build` to validate your production bundle.

## Media information

The original Figma collection contains 229 screens across seven portfolio case studies. The website's optimized web previews are 1920x1080 H.264. The videos recorded by the user were originally Full HD; upscaling to 3840x2160 **does not create genuine 4K detail**.

Optional GitHub Actions workflow `.github/workflows/render-v3-4k.yml` creates 3840x2160 upscaled previews and commits them to the review branch if GitHub Actions has write access. You may also generate them locally by installing FFmpeg and running `npm run media:4k`.

## Publishing

This is a review branch; do not merge or deploy publicly without the owner's approval.
