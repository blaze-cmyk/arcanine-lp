import { useEffect, useRef } from "react";

/**
 * Custom WebGL fragment shader — flowing neon-green "silk" waves
 * moving diagonally from bottom-left to top-right.
 * No external runtime; ~2KB of GLSL.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

// hash + value noise
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
  for(int i = 0; i < 5; i++){
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  // aspect-correct + center
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;

  // Diagonal axis: bottom-left -> top-right.
  // dir is the flow direction; perp is across the bands.
  vec2 dir  = normalize(vec2(1.0, 1.0));
  vec2 perp = vec2(-dir.y, dir.x);

  // Coordinates in (along-flow, across-flow)
  float along  = dot(p, dir);
  float across = dot(p, perp);

  // Animate flow: bands slide along diagonal
  float t = u_time * 0.18;

  // Warp the across-axis with fbm so bands ripple like silk
  float warp = fbm(vec2(along * 1.6 + t * 1.2, across * 2.2 - t * 0.6));
  float warp2 = fbm(vec2(across * 1.4 - t * 0.8, along * 1.1 + t * 0.4));
  float a = across + (warp - 0.5) * 1.1 + (warp2 - 0.5) * 0.6;

  // Multiple sine bands → wavy silk highlights
  float bands =
      sin(a * 6.0 + along * 1.5 + t * 1.5) * 0.55 +
      sin(a * 11.0 - along * 0.8 - t * 1.1) * 0.30 +
      sin(a * 18.0 + along * 0.4 + t * 2.2) * 0.15;

  // Sharpen highlights into thin silky strands
  float highlight = pow(smoothstep(0.2, 1.0, 0.5 + 0.5 * bands), 2.6);

  // Base dark green wash that fades toward edges
  float vign = smoothstep(1.25, 0.2, length(p));
  vec3 baseGreen = mix(vec3(0.0, 0.02, 0.01), vec3(0.0, 0.18, 0.09), vign * 0.6);

  // Neon green + cyan accents picked up by highlight
  vec3 neon  = vec3(0.0, 1.0, 0.53);              // #00FF88
  vec3 cyan  = vec3(0.0, 0.85, 0.78);             // teal accent
  float cyanMix = smoothstep(0.4, 0.95, fbm(vec2(along * 0.9 - t * 0.5, across * 1.3 + t * 0.3)));
  vec3 strand = mix(neon, cyan, cyanMix * 0.55);

  vec3 col = baseGreen + strand * highlight * 1.15;

  // Soft bloom-ish lift in the brightest spots
  col += strand * pow(highlight, 4.0) * 0.6;

  // Deep black corners
  col *= mix(0.55, 1.05, vign);

  // Subtle film grain
  float g = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.04;
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

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Fullscreen quad
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
      {/* Deep black base */}
      <div className="absolute inset-0" style={{ background: "#0A0A0A" }} />

      {/* Custom WebGL silk shader */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Extra neon green wash for brand consistency */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(55% 45% at 75% 30%, rgba(0,255,136,0.18) 0%, rgba(0,255,136,0) 70%), radial-gradient(45% 40% at 15% 85%, rgba(0,200,170,0.16) 0%, rgba(0,200,170,0) 70%)",
        }}
      />

      {/* Edge vignette to deepen corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 55%, rgba(5,15,10,0.65) 100%)",
        }}
      />
    </div>
  );
};

export default HeroShaderBackground;
