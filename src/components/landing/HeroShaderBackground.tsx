import { useEffect, useRef } from "react";

/**
 * WebGL animated liquid gradient background.
 * Inspired by Paper Shaders "Animated Gradient" — custom fragment shader,
 * tuned for slow, smooth, 3D-feeling motion in the brand green palette.
 */

const VERTEX_SHADER = `#version 300 es
layout(location = 0) in vec4 a_position;
void main() { gl_Position = a_position; }
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2  u_resolution;
uniform vec4  u_color1;
uniform vec4  u_color2;
uniform vec4  u_color3;
uniform float u_scale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_softness;

out vec4 fragColor;

#define PI 3.14159265358979

float random(vec2 st){
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st){
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0,0.0));
  float c = random(i + vec2(0.0,1.0));
  float d = random(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

vec4 blend(vec4 c1, vec4 c2, vec4 c3, float m, float edge){
  vec3 a = c1.rgb * c1.a;
  vec3 b = c2.rgb * c2.a;
  vec3 c = c3.rgb * c3.a;
  float r1 = smoothstep(0.0 + 0.35*edge, 0.7 - 0.35*edge + 0.02, m);
  float r2 = smoothstep(0.3 + 0.35*edge, 1.0 - 0.35*edge + 0.02, m);
  vec3 mix1 = mix(a, b, r1);
  float o1  = mix(c1.a, c2.a, r1);
  vec3 col  = mix(mix1, c, r2);
  float o   = mix(o1, c3.a, r2);
  return vec4(col, o);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Slow horizontal sway (left ↔ right ↔ left)
  float t = 0.08 * u_time;
  float sway = sin(u_time * 0.25) * 0.6;

  float ns = 0.0008 + 0.004 * u_scale;
  uv -= 0.5;
  uv *= (ns * u_resolution);
  uv /= u_pixelRatio;
  uv += 0.5;

  uv.x += sway;

  float n1 = noise(uv * 0.9 + vec2(t, 0.0));
  float n2 = noise(uv * 1.6 + vec2(-t * 0.6, t * 0.2));
  uv.x += 3.0 * u_distortion * n2 * cos(n1 * 6.28318);
  uv.y += 1.5 * u_distortion * n2 * sin(n1 * 6.28318);

  for (float i = 1.0; i <= 5.0; i++){
    uv.x += u_swirl / i * cos(t + i * 1.2 * uv.y);
    uv.y += (u_swirl * 0.4) / i * cos(t * 0.8 + i * 0.8 * uv.x);
  }

  float sh = 0.5 + 0.5 * sin(uv.x * 1.1) * cos(uv.y * 1.0);
  vec4 col = blend(u_color1, u_color2, u_color3, sh, 1.0 - clamp(u_softness, 0.0, 1.0));
  fragColor = vec4(col.rgb, col.a);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

const HeroShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      time: gl.getUniformLocation(program, "u_time"),
      pr:   gl.getUniformLocation(program, "u_pixelRatio"),
      res:  gl.getUniformLocation(program, "u_resolution"),
      c1:   gl.getUniformLocation(program, "u_color1"),
      c2:   gl.getUniformLocation(program, "u_color2"),
      c3:   gl.getUniformLocation(program, "u_color3"),
      sc:   gl.getUniformLocation(program, "u_scale"),
      dist: gl.getUniformLocation(program, "u_distortion"),
      sw:   gl.getUniformLocation(program, "u_swirl"),
      sf:   gl.getUniformLocation(program, "u_softness"),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const t = (now - start) / 1000;
      gl.useProgram(program);
      gl.uniform1f(u.time, t);
      gl.uniform1f(u.pr, Math.min(window.devicePixelRatio || 1, 2));
      gl.uniform2f(u.res, canvas.width, canvas.height);
      // Single dominant green tone — solid color with dark fade
      gl.uniform4f(u.c1, 0.0,  0.05, 0.03, 1.0);     // dark edge
      gl.uniform4f(u.c2, 0.0,  1.0,  0.533, 1.0);    // #00FF88
      gl.uniform4f(u.c3, 0.0,  1.0,  0.533, 1.0);    // same #00FF88 (mono)
      gl.uniform1f(u.sc, 1.4);
      gl.uniform1f(u.dist, 0.12);
      gl.uniform1f(u.sw, 0.35);
      gl.uniform1f(u.sf, 1.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
};

export default HeroShaderBackground;
