import { useEffect, useRef } from "react";

/**
 * Unicorn Studio scene embed — renders the exact JSON scene
 * (purple/green gradient + FBM noise + blur + retro screen + SDF strip).
 * Loads the official Unicorn Studio runtime once and mounts the scene JSON.
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
        { min: 992, max: null, name: "Desktop", props: { top: 0.5, width: 450 } },
        { name: "Mobile", max: 575, props: { width: 594, top: 0.803127962085308 }, min: 0 },
      ],
      visible: true,
      locked: false,
      aspectRatio: 1.7843137254901962,
      layerName: "",
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
      width: 450,
      widthMode: "fixed",
      height: 252.1978021978022,
      heightMode: "auto",
      left: 0.5,
      leftMode: "relative",
      top: 0.5,
      topMode: "relative",
      rotation: 0,
      trackAxes: "xy",
      fitToCanvas: 1,
      src: "https://assets.unicorn.studio/images/89f3MApYUBOB8HvPPd4bMxtGFXh1/u2813459499_dark_black_background_with_purple_and_green_gradi_6ca36148-36ce-463f-83f6-e2f29c75875a_3.png",
      naturalWidth: 1456,
      naturalHeight: 816,
      data: { uniforms: {} },
      id: "image",
    },
    {
      breakpoints: [
        { max: null, min: 992, name: "Desktop", props: { pos: { type: "Vec2", _x: 0.5, _y: 0.73 }, frequency: 1 } },
        { max: 991, name: "Tablet", props: { frequency: 2, pos: { type: "Vec2", _x: 0.5, _y: 0.7 } }, min: 576 },
        { max: 575, props: { frequency: 2.5 }, name: "Mobile", min: 0 },
      ],
      visible: true,
      aspectRatio: 1,
      userDownsample: 0.25,
      layerType: "effect",
      type: "fbm",
      usesPingPong: false,
      speed: 0.33,
      trackMouse: 0,
      trackAxes: "xy",
      mouseMomentum: 0.07,
      texture: false,
      animating: true,
      isMask: 0,
      data: {
        depth: false,
        uniforms: {
          frequency: { name: "uFrequency", type: "1f", value: 0.2 },
          pos: { name: "uPos", type: "2f", value: { type: "Vec2", _x: 0.5, _y: 0.5 } },
        },
        isBackground: false,
      },
      id: "effect1",
    },
    {
      breakpoints: [
        { max: null, name: "Desktop", props: { amount: 1 }, min: 992 },
        { props: { amount: 2 }, min: 576, name: "Tablet", max: 991 },
        { min: 0, name: "Mobile", props: { amount: 2.5 }, max: 575 },
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
          { prop: "vertical", value: 3, downSample: 0.5 },
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
      type: "retro_screen",
      usesPingPong: false,
      speed: 0.25,
      trackMouse: 0,
      trackAxes: "xy",
      mouseMomentum: 0,
      texture: false,
      animating: false,
      isMask: 0,
      data: { depth: false, uniforms: {}, isBackground: false },
      id: "effect3",
    },
    {
      breakpoints: [],
      visible: true,
      aspectRatio: 1,
      userDownsample: 1,
      layerType: "effect",
      type: "sdf_strip",
      usesPingPong: false,
      speed: 0.95,
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
  options: { name: "Homepage Hero - Responsive", fps: 60, dpi: 1, scale: 1, includeLogo: false, isProduction: false },
  version: "1.4.33",
  id: "SnypTBESEkizfvlXVILU",
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
    const isMobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

    const start = () => {
      loadUnicornStudio()
        .then(() => {
          if (cancelled || !containerRef.current) return;
          const US = (window as any).UnicornStudio;
          if (!US?.addScene) return;
          US.addScene({
            element: containerRef.current,
            fps: isMobile ? 30 : 60,
            scale: 1,
            dpi: isMobile ? 1 : 1.25,
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

    // Defer heavy WebGL init until the browser is idle so it doesn't block first paint
    const ric: any = (window as any).requestIdleCallback;
    const handle = ric
      ? ric(start, { timeout: 1500 })
      : window.setTimeout(start, 200);

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

      {/* Unicorn scene, hue-shifted purple → neon green */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{
          display: "block",
          filter: "hue-rotate(-150deg) saturate(1.45) brightness(1.05)",
        }}
      />

      {/* Neon green glow tint + signature #00FF88 wash */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 60%, rgba(0,255,136,0.18) 0%, rgba(0,255,136,0) 70%), radial-gradient(40% 35% at 20% 80%, rgba(0,200,170,0.14) 0%, rgba(0,200,170,0) 70%)",
        }}
      />

      {/* Subtle dark green vignette to deepen edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 50%, rgba(10,30,20,0.55) 100%)",
        }}
      />
    </div>
  );
};

export default HeroShaderBackground;
