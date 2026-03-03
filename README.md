# $GNOMES — THEY WERE NEVER MYTHS

> A museum-grade shitpost disguised as a conspiracy investigation.

Next.js + Tailwind CSS + Framer Motion single-page website for the $GNOMES meme coin community. Designed to feel like a schizo-conspiracy corkboard crossed with early-2000s internet aesthetics and modern micro-interactions.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
├── public/                  # All images & assets served here
│   ├── *.png / *.jpg        # Evidence photos, gnomeland renders, etc.
│   └── gifs/                # Drop animated GIFs here
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind + custom animations/utilities
│   │   ├── layout.tsx       # Root layout (metadata, body class)
│   │   └── page.tsx         # Main page — composes all sections
│   └── components/
│       ├── Hero.tsx          # "THEY WERE NEVER MYTHS" hero + ticker
│       ├── EvidenceBoard.tsx # Conspiracy collage + zoom-enhance modal
│       ├── RedactedFiles.tsx # FBI scan doc + redaction slider
│       ├── Gnomeland.tsx     # Cel-shaded world + orb easter egg
│       ├── Disclaimer.tsx    # Folklore disclaimer + activity meters
│       ├── Footer.tsx        # Visitor counter, webring, stay awake
│       ├── GnomeRunner.tsx   # Clickable gnome that sprints across screen
│       ├── EnhanceMode.tsx   # Magnifier cursor over evidence images
│       ├── RedCircleTool.tsx # MS Paint red circle drawing tool
│       └── LiveChat.tsx      # Fake auto-posting forum chat overlay
```

---

## How to Add / Update Evidence Cards

Edit the `EVIDENCE` array in `src/components/EvidenceBoard.tsx`:

```ts
{
  id: "e7",                        // unique ID
  title: "NEW SIGHTING",           // card title
  caption: "THEY SAID IT WAS A CAT.", // caption text
  image: "/your-new-image.png",    // path in /public
  rotation: -2,                    // card tilt in degrees
  stamp: "LOOK CLOSER.",           // optional red stamp text
}
```

Drop images into `/public/` and reference them with a leading `/`.

---

## Where to Drop Assets

| Type | Location | Notes |
|------|----------|-------|
| Evidence photos | `/public/` | PNG/JPG, any size (lazy-loaded) |
| Animated GIFs | `/public/gifs/` | Use sparingly for page weight |
| Gnomeland renders | `/public/` | Cel-shaded / purple meadow art |
| Document scans | `/public/` | Grainy, FBI-style scan aesthetic |

---

## 5 Silly Interactions

1. **Gnome Runner** — Click the `🏃 GNOME` button (bottom-left). A gnome sprints across the screen with a smoke trail, bounces off the right edge, then disappears.

2. **ENHANCE Mode** — Click `🔍 ENHANCE OFF` (top-right) to toggle. When on, hovering over any evidence image shows a magnifying crosshair with zoomed view.

3. **Orb Easter Egg** — In the GNOMELAND section, click the purple orb **7 times**. A CONFIDENTIAL stamp slams on screen, then a secret "YOU ARE TOO CLOSE" panel slides out.

4. **Red Circle Drawing** — Click `⭕ DRAW OFF` (bottom-right) to toggle. When on, clicking anywhere on the page drops MS Paint-style red circles with arrows pointing at nothing. Hit CLEAR to remove them.

5. **Live Thread Chat** — Click `💬 LIVE THREAD` (bottom-center). A fake forum chat auto-posts conspiracy messages every few seconds. Purely cosmetic, no backend.

---

## Redaction Slider

In the REDACTED FILES section, drag the slider to control how much of the classified document is visible. Moving the slider shakes the CONFIDENTIAL stamp.

---

## Customization

- **Colors**: Edit `tailwind.config.ts` → `theme.extend.colors`
- **Animations**: Edit `tailwind.config.ts` → `theme.extend.keyframes` or `src/app/globals.css`
- **Chat messages**: Edit the `MESSAGES` array in `src/components/LiveChat.tsx`
- **Redacted doc text**: Edit the `LINES` array in `src/components/RedactedFiles.tsx`

---

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS 3**
- **Framer Motion 11**
- **TypeScript**

---

## Notes

- `prefers-reduced-motion: reduce` is respected — all animations are disabled for users who prefer reduced motion.
- Evidence images are lazy-loaded for performance.
- Mobile: evidence grid becomes a horizontal scroll carousel, modals go full-screen.
- No autoplay audio.

---

*made with paranoia and $GNOMES*
