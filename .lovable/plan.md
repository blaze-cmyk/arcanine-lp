

This is a **research/explanation question**, not an implementation task — so no code plan needed. Just a clear walkthrough.

## The Full Process: From Screenshot → Animated Shader

### 1. Visual Analysis of Your Screenshot
When you sent the Solana-style reference image, I identified the key visual ingredients:
- **Deep black base** with a soft color wash
- **Glowing 3D wavy ribbon/strip** (the signature element)
- **Soft cloudy gradients** (purple originally, then green per your request)
- **Grainy, slightly retro texture** overlay
- **Vignette** darkening the edges
- **Liquid, slow-moving** feel — not video, but real-time

### 2. Why I Chose Unicorn Studio (not custom WebGL)
I had three options:
- **Option A**: Hand-write GLSL shaders → weeks of work, fragile
- **Option B**: Use a video/Lottie file → heavy, not crisp, no interactivity
- **Option C**: Use a pre-built scene from Unicorn Studio → matches the exact aesthetic, lightweight, interactive

Unicorn Studio is a tool designers use to compose layered WebGL effects (FBM noise, blur, SDF shapes, retro screen filters). It exports a **JSON scene description** + ships a tiny runtime (`unicornStudio.umd.js`) that renders it.

I knew their library has a "Solana-style hero" template that matches your reference almost 1:1.

### 3. The Scene JSON (the "recipe")
The big `SCENE_JSON` object in `HeroShaderBackground.tsx` is a **layer stack**, rendered bottom-to-top:

```text
Layer 1: Gradient base (background fill)
Layer 2: Image (purple/green cloud texture from Unicorn's CDN)
Layer 3: FBM noise effect (the organic flow, animated, speed 0.33)
Layer 4: Blur effect (softens everything)
Layer 5: Retro screen effect (subtle scanline grain)
Layer 6: SDF strip (the glowing 3D wavy ribbon, speed 0.95)
```

Each layer has **breakpoints** (Desktop / Tablet / Mobile) so the noise frequency and ribbon position adapt responsively.

### 4. Loading the Runtime Efficiently
```text
loadUnicornStudio()  → injects <script> once, cached via a Promise
useEffect            → waits for idle browser time (requestIdleCallback)
US.addScene({...})   → mounts the scene into our <div ref>
cleanup              → scene.destroy() on unmount
```
The `requestIdleCallback` wrapper is why the page paints fast — WebGL init is deferred until the browser is free.

### 5. Recoloring Purple → Green (Your Request)
The original Unicorn template was purple. Rather than rebuild the scene, I used **two CSS tricks layered on top**:

```text
filter: hue-rotate(-150deg) saturate(1.45) brightness(1.05)
   → shifts the whole purple scene into the green spectrum

+ radial-gradient overlays with #00FF88 at mix-blend-mode: screen
   → adds your signature neon green glow on top

+ dark green vignette
   → deepens the edges for that premium feel
```

This is way cheaper than re-authoring the scene and gave us pixel-perfect brand alignment.

### 6. Composition in `Hero.tsx`
```text
<HeroShaderBackground />     ← the WebGL canvas
+ noise PNG overlay          ← extra grain
+ SVG fractalNoise filter    ← film texture
+ linear-gradient mask       ← fades bottom into page bg
+ z-10 content on top        ← headline, CTA, dashboard image
```

### TL;DR
1. Read your screenshot → identified 6 visual layers
2. Picked Unicorn Studio (right tool for the job — saves weeks)
3. Used their JSON scene format to declaratively stack effects
4. Lazy-loaded the runtime via `requestIdleCallback` for performance
5. Hue-rotated the purple template + overlaid green glows to match your brand
6. Composed it under your hero content with masks and noise textures

The "magic" is really: **right tool + declarative scene config + CSS color shift + performance deferral**. No custom shader code needed.

