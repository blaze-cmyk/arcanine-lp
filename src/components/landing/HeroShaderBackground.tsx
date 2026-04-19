import { useEffect, useRef } from "react";
import heroSilk from "@/assets/hero-silk.png";

/**
 * Unicorn Studio scene — uses our custom silk image as the base texture,
 * with FBM noise warp + SDF strip flowing diagonally from bottom-left → top-right.
 */

const SCENE_JSON = {
  history: [
    {
      breakpoints: [],
      visible: true,
      aspectRatio: 1,
      userDownsample: 0.25,
      layerType: "effect",
      type: "gradient",
      usesPingPong: false,
      speed: 0,
      trackMouse: 0,
      trackAxes: "xy",
      mouseMomentum: 0,
      texture: false,
      animating: false,
      isMask: 0,
      data: { downSample: 0.5, depth: false, uniforms: {}, isBackground: true },
      id: "effect",
    },
    {
      breakpoints: [
        { min: 992, max: null, name: "Desktop", props: { top: 0.5, width: 1600 } },
        { name: "Mobile", max: 575, props: { width: 900, top: 0.5 }, min: 0 },
      ],
      visible: true,
      locked: false,
      aspectRatio: 1.7843137254901962,
      layerName: "silk",
      userDownsample: 0.25,
      isElement: true,
      opacity: 1,
      effects: [],
      displace: 0,
      trackMouse: 0,
      anchorPoint: "center",
      mouseMomentum: 0,
      blendMode: "NORMAL",
      bgDisplace: 0,
      mask: 0,
      maskBackground: { type: "Vec3", _x: 0, _y: 0, _z: 0 },
      maskAlpha: 0,
      maskDepth: 0,
      dispersion: 0,
      axisTilt: 0,
      states: { appear: [], scroll: [], hover: [] },
      layerType: "image",
      imageLoaded: false,
      width: 1600,
      widthMode: "fixed",
      height: 896,
      heightMode: "auto",
      left: 0.5,
      leftMode: "relative",
      top: 0.5,
      topMode: "relative",
      rotation: 0,
      trackAxes: "xy",
      fitToCanvas: 1,
      // our uploaded silk image — Vite resolves this to a hashed URL
      src: heroSilk,
      naturalWidth: 1920,
      naturalHeight: 1080,
      data: { uniforms: {} },
      id: "image",
    },
    {
      breakpoints: [
        // Position FBM hotspot toward bottom-left so motion appears to flow from there.
        { max: null, min: 992, name: "Desktop", props: { pos: { type: "Vec2", _x: 0.2, _y: 0.85 }, frequency: 1.1 } },
        { max: 991, name: "Tablet", props: { frequency: 1.6, pos: { type: "Vec2", _x: 0.2, _y: 0.85 } }, min: 576 },
        { max: 575, props: { frequency: 2.2, pos: { type: "Vec2", _x: 0.2, _y: 0.85 } }, name: "Mobile", min: 0 },
      ],
      visible: true,
      aspectRatio: 1,
      userDownsample: 0.25,
      layerType: "effect",
      type: "fbm",
      usesPingPong: false,
      speed: 0.28,
      trackMouse: 0,
      trackAxes: "xy",
      mouseMomentum: 0.07,
      texture: false,
      animating: true,
      isMask: 0,
      data: {
        depth: false,
        uniforms: {
          frequency: { name: "uFrequency", type: "1f", value: 0.22 },
          pos: { name: "uPos", type: "2f", value: { type: "Vec2", _x: 0.2, _y: 0.85 } },
        },
        isBackground: false,
      },
      id: "effect1",
    },
    {
      breakpoints: [
        { max: null, name: "Desktop", props: { amount: 0.8 }, min: 992 },
        { props: { amount: 1.5 }, min: 576, name: "Tablet", max: 991 },
        { min: 0, name: "Mobile", props: { amount: 2 }, max: 575 },
      ],
      visible: true,
      aspectRatio: 1,
      userDownsample: 1,
      layerType: "effect",
      type: "blur",
      usesPingPong: false,
      trackMouse: 0,
      trackAxes: "xy",
      mouseMomentum: 0,
      texture: false,
      animating: false,
      isMask: 0,
      data: {
        downSample: 0.25,
        depth: false,
        uniforms: { amount: { name: "uAmount", type: "1f", value: 0.2 } },
        isBackground: false,
        passes: [
          { prop: "vertical", value: 1, downSample: 0.25 },
          { prop: "vertical", value: 2, downSample: 0.5 },
        ],
      },
      id: "effect2",
    },
    {
      breakpoints: [],
      visible: true,
      aspectRatio: 1,
      userDownsample: 1,
      layerType: "effect",
      type: "sdf_strip",
      usesPingPong: false,
      // Strip travels diagonally; higher speed = faster ribbon flow BL → TR
      speed: 0.85,
      trackMouseMove: 0,
      mouseMomentum: 0,
      trackMouse: 0,
      texture: false,
      animating: true,
      isMask: 0,
      data: { depth: false, uniforms: {}, isBackground: false },
      id: "effect4",
    },
  ],
  options: { name: "Hero Silk - BL to TR", fps: 60, dpi: 1, scale: 1, includeLogo: false, isProduction: false },
  version: "1.4.33",
  id: "ArcanineHeroSilk",
};

const SCRIPT_SRC = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";

let scriptPromise: Promise<void> | null = null;
function loadUnicornStudio(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if ((window as any).UnicornStudio) return resolve();
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load UnicornStudio"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

const HeroShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: any = null;
    let cancelled = false;
    const start = () => {
      loadUnicornStudio()
        .then(() => {
          if (cancelled || !containerRef.current) return;
          const US = (window as any).UnicornStudio;
          if (!US?.addScene) return;
          US.addScene({
            element: containerRef.current,
            fps: 60,
            scale: 1,
            dpi: 1.5,
            projectId: SCENE_JSON.id,
            lazyLoad: false,
            fixed: false,
            altText: "Animated hero background",
            ariaLabel: "Animated hero background",
            production: false,
            interactivity: { mouse: { disableMobile: true } },
            data: SCENE_JSON,
          } as any)
            .then((s: any) => {
              scene = s;
            })
            .catch(() => {});
        })
        .catch(() => {});
    };

    const ric: any = (window as any).requestIdleCallback;
    const handle = ric ? ric(start, { timeout: 1500 }) : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      const cic: any = (window as any).cancelIdleCallback;
      if (ric && cic) cic(handle);
      else clearTimeout(handle);
      try {
        scene?.destroy?.();
      } catch {}
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Deep black base */}
      <div className="absolute inset-0" style={{ background: "#0A0A0A" }} />

      {/* Unicorn scene rendering our silk texture, rotated so the flow runs bottom-left → top-right */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{
          display: "block",
          transform: "rotate(-12deg) scale(1.25)",
          transformOrigin: "center center",
        }}
      />

      {/* Neon green wash for brand consistency */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(55% 45% at 80% 25%, rgba(0,255,136,0.18) 0%, rgba(0,255,136,0) 70%), radial-gradient(50% 45% at 15% 85%, rgba(0,200,170,0.16) 0%, rgba(0,200,170,0) 70%)",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 55%, rgba(5,15,10,0.7) 100%)",
        }}
      />
    </div>
  );
};

export default HeroShaderBackground;
