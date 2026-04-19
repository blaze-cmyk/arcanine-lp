import { useEffect, useRef } from "react";

/**
 * Silk Background — direct port of the Framer "Silk_Background" component.
 * Animated WebGL shader: flowing silk waves. Tuned with neon green color
 * and a diagonal rotation so motion reads from bottom-left → top-right.
 */

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd     = noise(gl_FragCoord.xy);
  vec2  uv      = rotateUvs(vUv * uScale, uRotation);
  vec2  tex     = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
    0.4 * sin(5.0 * (tex.x + tex.y +
                     cos(3.0 * tex.x + 5.0 * tex.y) +
                     0.02 * tOffset) +
              sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("Silk shader compile error", gl.getShaderInfoLog(sh));
  }
  return sh;
}
function link(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  return p;
}

// Tuned for the brand: neon green silk flowing bottom-left → top-right.
// Darker base color so highlights pop against deep black, matching the reference image.
const COLOR: [number, number, number] = [0.0, 0.55, 0.25];
const SPEED = 1.8;
const SCALE = 1.2;
const ROTATION_DEG = 45; // diagonal flow
const NOISE = 1.5;

const HeroShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) return;

    const prog = link(gl, VERT, FRAG);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uColor = gl.getUniformLocation(prog, "uColor");
    const uSpeed = gl.getUniformLocation(prog, "uSpeed");
    const uScale = gl.getUniformLocation(prog, "uScale");
    const uRotation = gl.getUniformLocation(prog, "uRotation");
    const uNoise = gl.getUniformLocation(prog, "uNoiseIntensity");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const W = Math.max(1, Math.floor(parent.clientWidth * dpr));
      const H = Math.max(1, Math.floor(parent.clientHeight * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const start = performance.now();
    let raf = 0;
    let running = true;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      if (!running) return;
      const t = (performance.now() - start) / 1000;
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform1f(uTime, reduced ? 0 : t);
      gl.uniform3f(uColor, COLOR[0], COLOR[1], COLOR[2]);
      gl.uniform1f(uSpeed, SPEED);
      gl.uniform1f(uScale, SCALE);
      gl.uniform1f(uRotation, (ROTATION_DEG * Math.PI) / 180);
      gl.uniform1f(uNoise, NOISE);
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
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "#050807" }} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Subtle vignette to deepen edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(0,8,5,0.6) 100%)",
        }}
      />
    </div>
  );
};

export default HeroShaderBackground;
