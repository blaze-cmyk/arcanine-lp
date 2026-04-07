

## Polish Pass: Spacing, Separators & Background Atmosphere

### What we're doing
Elevating the landing page from "sections stacked together" to a cohesive, intentionally designed experience through three layers of polish:

1. **Consistent section spacing system**
2. **Radial gradient separators** at key transition points
3. **Background atmosphere** (noise texture, gradient blobs) across sections

---

### 1. Section Spacing System

Standardize all sections to a rhythm. Currently spacing is inconsistent (`py-24`, `py-32`, `mt-12`, etc.).

**New spacing rules:**
- Hero → LiveWins: keep tight (they're visually connected)
- LiveWins → Features: `py-32` with separator
- Features → HowItWorks: `py-32` with separator
- HowItWorks → FairnessLogic: `py-32`
- FairnessLogic → Stats: `py-32` with separator
- Stats → FAQ: `py-32`
- FAQ → DemoCTA: `py-32` with separator
- DemoCTA → Footer: `py-32`

**Files:** Every section component gets consistent `py-32 sm:py-40` padding.

---

### 2. Radial Gradient Separators

Create a reusable `<SectionDivider />` component — a horizontal radial gradient line (orange-tinted, fading to transparent at edges). Place it between sections that need a visual break.

**New file:** `src/components/landing/SectionDivider.tsx`
- A thin horizontal line with `radial-gradient(ellipse at center, rgba(255,106,0,0.15), transparent 70%)`
- Height: ~1px with soft glow (`h-px` + blur shadow)
- Max-width constrained to `max-w-4xl` so it doesn't stretch edge-to-edge

**Placement in `Index.tsx`** — between:
- LiveWins → Features
- Features → HowItWorks
- FairnessLogic → Stats
- FAQ → DemoCTA

Not everywhere — only where sections shift context.

---

### 3. Hero Background Atmosphere

The hero is plain dark. Add depth with:

**In `Hero.tsx`:**
- A large, soft orange blob (top-right): `radial-gradient(ellipse at 70% 20%, rgba(255,106,0,0.06), transparent 60%)`
- A subtle blue/purple blob (bottom-left): `radial-gradient(ellipse at 20% 80%, rgba(100,100,255,0.03), transparent 60%)`
- A noise texture overlay (reuse the SVG filter from Features or add a CSS-based grain)

**In `Index.tsx` (global background layer):**
- Add a persistent subtle noise overlay to the entire page body using a CSS pseudo-element or a fixed-position div with the noise filter at very low opacity (`opacity-[0.015]`)

---

### 4. Atmospheric Blobs on Other Sections

Add subtle, non-distracting gradient blobs to sections that feel flat:

- **HowItWorks**: Soft orange radial glow top-center
- **Stats**: Warm golden glow behind the numbers area
- **DemoCTA**: Already has glow — enhance slightly
- **FAQ**: Very subtle muted glow center

These are `absolute` positioned divs with `pointer-events-none`, large blur, and ~3-6% opacity.

---

### 5. Global Noise Texture

Add a page-wide noise grain overlay in `Index.tsx`:
- Fixed position, full viewport, `pointer-events-none`
- Uses the same SVG `feTurbulence` filter from Features
- `opacity-[0.015]` and `mix-blend-overlay`
- Gives the entire page a tactile, printed feel

---

### Files to modify
| File | Changes |
|------|---------|
| `src/components/landing/SectionDivider.tsx` | **New** — reusable gradient separator |
| `src/pages/Index.tsx` | Add dividers between sections, add global noise overlay |
| `src/components/landing/Hero.tsx` | Add background gradient blobs + noise |
| `src/components/landing/HowItWorks.tsx` | Normalize padding, add ambient blob |
| `src/components/landing/Features.tsx` | Normalize padding |
| `src/components/landing/FairnessLogic.tsx` | Normalize padding |
| `src/components/landing/Stats.tsx` | Normalize padding, add warm glow |
| `src/components/landing/FAQ.tsx` | Normalize padding, add subtle glow |
| `src/components/landing/DemoCTA.tsx` | Normalize padding |
| `src/components/landing/LiveWins.tsx` | Minor spacing tweak |

