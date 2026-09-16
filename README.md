# FreightCore Logistics

A premium, single-page freight and fleet management experience built for the Truckinzy Full-Stack Developer Intern assignment.

## Highlights

- GSAP ScrollTrigger pinned horizontal service journey on desktop
- Responsive stacked service experience on mobile and tablet
- Lightweight Three.js network globe built entirely from primitives
- Animated operational counters and scroll-mapped content reveals
- Reduced-motion support, semantic sections and keyboard-friendly navigation
- Custom route-control visualization with no external image dependency

## Run locally

```bash
pnpm install
pnpm dev
```

Create a production build with `pnpm build`.

## Stack

Next.js, React, TypeScript, GSAP, Three.js and CSS.

## Performance choices

The WebGL scene uses low-cost geometry, basic unlit materials and a capped device pixel ratio. All geometries, materials, animation frames, listeners and the renderer are disposed during cleanup. The mobile experience avoids a pinned horizontal scroll to preserve natural touch behaviour.
