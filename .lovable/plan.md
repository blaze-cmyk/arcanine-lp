

# Spacing & Visual Rhythm Refinement

## Current State

Every section uses a flat `py-24` (96px top + bottom), creating a monotonous, uniform rhythm. A senior designer would vary spacing based on content hierarchy and section relationships.

## Current section paddings (top to bottom)

| Section | Current Padding |
|---------|----------------|
| Hero | `min-h-screen`, `pt-20 sm:pt-24` |
| LiveWins | `mt-12 pb-6` |
| Features | `py-24` |
| HowItWorks | `py-24 sm:py-32` |
| FairnessLogic | `py-24 sm:py-32` |
| Stats | `py-24` |
| FAQ | `py-24` |
| DemoCTA | `py-32` |
| Footer | border-t, `py-16` internal |

## Design Approach

Apply a **content-hierarchy spacing system** with three tiers:

- **Tight** (`py-16 sm:py-20`) — for sections that are contextually linked to their neighbors (LiveWins → Features)
- **Standard** (`py-24 sm:py-32`) — for mid-weight standalone sections (HowItWorks, FairnessLogic, FAQ)
- **Generous** (`py-32 sm:py-40`) — for high-impact sections that need breathing room (Stats/testimonials, DemoCTA)

Additionally, add **subtle visual separators** between major thematic shifts using a faint gradient divider or soft border — not between every section, just at 2-3 key transition points.

## Planned Changes

### 1. Update section paddings across components

| Section | New Padding | Rationale |
|---------|------------|-----------|
| LiveWins | `mt-8 pb-8` → tighten to Hero (they're connected) |
| Features | `py-20 sm:py-28` — slight breathing room, not max |
| HowItWorks | `py-24 sm:py-32` — keep as-is, good weight |
| FairnessLogic | `py-24 sm:py-32` — keep as-is |
| Stats | `py-32 sm:py-40` — hero-level section, needs air |
| FAQ | `py-24 sm:py-32` — standard |
| DemoCTA | `py-32 sm:py-44` — final CTA, maximum breathing room |

### 2. Add subtle dividers in Index.tsx

Insert 2-3 thin gradient divider `<div>` elements between major thematic shifts:
- After **Features** (shift from product features → process explanation)
- After **FairnessLogic** (shift from trust → social proof)
- Before **DemoCTA** (separating FAQ from final CTA)

Each divider: a `max-w-xl mx-auto h-px` with a subtle radial gradient from `border/50` to transparent.

### 3. Files to edit

- `src/pages/Index.tsx` — add divider elements
- `src/components/landing/LiveWins.tsx` — adjust padding
- `src/components/landing/Features.tsx` — adjust padding
- `src/components/landing/Stats.tsx` — adjust padding
- `src/components/landing/DemoCTA.tsx` — adjust padding

5 files, small targeted changes each.

