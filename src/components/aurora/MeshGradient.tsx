"use client";

import { useEffect, useRef, useState } from "react";
import Aurora from "./Aurora";

/* Mesh gradient em WebGL:
   ruído fbm com domain warping → mapeado na paleta (ink → bordô → crimson → ember → papel),
   arcos escuros no topo e na base, veios de cinza-aço, brilho que segue o mouse,
   matriz de pontos cintilante e granulado. Sem WebGL, cai para a aurora em CSS. */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_dpr;
uniform float u_intensity; uniform float u_scale;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= .5; }
  return v;
}
vec3 ramp(float t){
  vec3 ink = vec3(.030, .036, .038), bordo = vec3(.36, .0, .035), crim = vec3(.78, .05, .10),
       ember = vec3(1., .40, .34), paper = vec3(.97, .94, .86);
  t = clamp(t, 0., 1.);
  if (t < .28) return mix(ink, bordo, smoothstep(0., .28, t));
  if (t < .62) return mix(bordo, crim, smoothstep(.28, .62, t));
  if (t < .84) return mix(crim, ember, smoothstep(.62, .84, t));
  return mix(ember, paper, smoothstep(.84, 1., t));
}
void main(){
  vec2 p = (gl_FragCoord.xy - .5 * u_res) / u_res.y * u_scale;
  float t = u_time * .045;
  vec2 m = (u_mouse - .5) * vec2(u_res.x / u_res.y, 1.) * u_scale;

  vec2 q = vec2(fbm(p * .9 + t), fbm(p * .9 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.1 + 1.8 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p * 1.1 + 1.8 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = smoothstep(.3, .72, fbm(p * .9 + 2. * r));

  // arcos escuros no topo e na base que respiram com o ruído, com bordas de luz
  float e1 = length((p - vec2(0., .70)) / vec2(.9, .36)) + (q.x - .5) * .5;
  float e2 = length((p - vec2(0., -.72)) / vec2(.9, .32)) + (q.y - .5) * .5;
  float shade = smoothstep(.7, 1.25, e1) * smoothstep(.7, 1.25, e2);
  float rim = exp(-pow((e1 - 1.15) / .3, 2.)) + exp(-pow((e2 - 1.15) / .3, 2.));

  float md = length(p - m);
  float c = f * .56 + rim * (.24 + .24 * f) + .1 + .16 * exp(-md * md * 2.2);
  c -= max(c - .6, 0.) * .65; // comprime os brilhos: vermelho + preto, sem estourar no branco
  c *= mix(.14, 1., shade);

  vec3 col = ramp(c);
  col = mix(col, vec3(.07, .085, .085), (1. - shade) * .5);
  float steelMask = smoothstep(.5, .75, q.y) * smoothstep(.15, .4, c) * (1. - smoothstep(.6, .85, c));
  col = mix(col, vec3(.45, .48, .49) * (.55 + c), steelMask * .7);
  float side = smoothstep(.5, 1.05, abs(p.x)) * shade * smoothstep(.3, .8, f);
  col = mix(col, vec3(.5, .5, .5) * (.4 + c * .4), side * .3);

  // intensidade < 1 aproxima tudo do ink: ambientação em vez de protagonismo
  col = mix(vec3(.030, .036, .038), col, u_intensity);

  // matriz de pontos: só onde há luz, agrupada em manchas e cintilando
  float cell = 6. * u_dpr;
  vec2 g = gl_FragCoord.xy / cell;
  vec2 id = floor(g); vec2 gv = fract(g) - .5;
  float lum = dot(col, vec3(.299, .587, .114));
  float cluster = smoothstep(.38, .56, fbm(id * .035 + vec2(t * 3., -t * 2.)));
  float twinkle = step(.45, hash(id + floor(u_time * 1.5 + hash(id) * 7.)));
  float d = smoothstep(.26, .12, length(gv));
  float dotA = d * cluster * twinkle * smoothstep(.15, .45, lum);
  col = mix(col, mix(vec3(1.), col * 1.6 + .25, .35), dotA * .9 * u_intensity);

  col += (hash(gl_FragCoord.xy + fract(u_time) * 100.) - .5) * .055;
  gl_FragColor = vec4(col, 1.);
}`;

interface MeshGradientProps {
  className?: string;
  /** 1 = Hero da Home; valores menores deixam o mesh mais discreto. */
  intensity?: number;
  /** Zoom do ruído e da composição (1 = Home; > 1 mostra mais formas, menores). */
  scale?: number;
}

export default function MeshGradient({ className = "", intensity = 1, scale = 1 }: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      setFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
      return s;
    };

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link");
    } catch (e) {
      console.error(e);
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uDpr = gl.getUniformLocation(prog, "u_dpr");
    gl.uniform1f(gl.getUniformLocation(prog, "u_intensity"), intensity);
    gl.uniform1f(gl.getUniformLocation(prog, "u_scale"), scale);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0.62, y: 0.55 };
    const mouse = { x: 0.62, y: 0.55 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(canvas);

    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (target.x - mouse.x) * 0.015;
      mouse.y += (target.y - mouse.y) * 0.015;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDpr, dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      // não usar loseContext(): o canvas devolve o mesmo contexto (já perdido) ao remontar,
      // o que quebrava o shader no StrictMode/Fast Refresh e caía no fallback em CSS
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [intensity, scale]);

  return (
    <div className={`mesh ${failed ? "no-webgl" : ""} ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
      <Aurora preset="hero" dots />
    </div>
  );
}
