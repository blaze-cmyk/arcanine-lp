import { useEffect, useRef } from "react";

/**
 * Custom WebGL "neon silk" shader.
 * Recreates the reference image: glossy diagonal silk folds in neon green
 * with cyan highlights, flowing from bottom-left to top-right.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++){
    v += a * noise(p);
    p = p * 2.03 + vec2(11.1, 7.3);
    a *= 0.5;
  }
  return v;
}

void main(){
  // Aspect-corrected coords centered on screen
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;

  // Diagonal axes: flow direction = bottom-left -> top-right
  vec2 dir  = normalize(vec2(1.0, 1.0));         // along the flow
  vec2 perp = vec2(-dir.y, dir.x);               // across the folds

  float along  = dot(p, dir);
  float across = dot(p, perp);

  float t = u_time * 0.22;

  // Two layers of warp give the "fabric folding" feel
  float w1 = fbm(vec2(along * 1.4 + t, across * 2.0 - t * 0.5));
  float w2 = fbm(vec2(across * 1.6 - t * 0.7, along * 0.9 + t * 0.4));
  float a = across + (w1 - 0.5) * 1.4 + (w2 - 0.5) * 0.7;

  // Silk highlights: stacked sines along the cross-axis, slowly drifting
  float bands =
      sin(a * 5.5  + along * 1.2 + t * 1.4) * 0.55 +
      sin(a * 10.0 - along * 0.6 - t * 1.0) * 0.30 +
      sin(a * 17.0 + along * 0.3 + t * 1.9) * 0.15;

  // Sharpen into thin glossy strands
  float strand = pow(smoothstep(0.25, 1.0, 0.5 + 0.5 * bands), 2.4);

  // Base fabric: deep emerald with darker hollows between folds
  vec3 deepBlack = vec3(0.0, 0.015, 0.01);
  vec3 emerald   = vec3(0.0, 0.32, 0.18);
  float fold = smoothstep(0.0, 1.0, 0.5 + 0.5 * sin(a * 2.4 + along * 0.6 + t * 0.6));
  vec3 fabric = mix(deepBlack, emerald, fold * 0.85);

  // Highlight color: neon green with occasional cyan accents (like the ref image)
  vec3 neon = vec3(0.0, 1.0, 0.45);              // #00FF73-ish
  vec3 cyan = vec3(0.0, 0.95, 0.85);             // teal accent
  float cyanMix = smoothstep(0.4, 0.95,
      fbm(vec2(along * 0.9 - t * 0.4, across * 1.3 + t * 0.25)));
  vec3 highlight = mix(neon, cyan, cyanMix * 0.55);

  vec3 col = fabric + highlight * strand * 1.2;

  // Specular pop on the brightest crests
  col += highlight * pow(strand, 5.0) * 0.7;

  // Vignette: darker corners, brighter center area for depth
  float v = smoothstep(1.35, 0.15, length(p));
  col *= mix(0.45, 1.05, v);

  // Crush blacks slightly so the dark folds read as deep black
  col = max(col - 0.01, 0.0);

  // Subtle grain
  float g = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.035;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error", gl.getShaderInfoLog(sh));
  }
  return sh;
}

const HeroShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const W = Math.max(2, Math.floor(w * dpr));
      const H = Math.max(2, Math.floor(h * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let running = true;
    const start = performance.now();
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      if (!running) return;
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 0 : t);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    render();

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        render();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Deep black base behind the canvas */}
      <div className="absolute inset-0" style={{ background: "#050807" }} />

      {/* The animated silk shader */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Soft edge vignette to deepen corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(0,8,5,0.65) 100%)",
        }}
      />
    </div>
  );
};

export default HeroShaderBackground;
