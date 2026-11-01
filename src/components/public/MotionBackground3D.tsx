"use client";

import React, { useEffect, useRef } from "react";

interface MotionBackground3DProps {
  /** Horizontal position of the globe centre as a fraction of width (desktop). */
  anchorX?: number;
  /** Overall brightness multiplier (0–1). */
  intensity?: number;
  /** Render the particle globe; set false for a starfield-only ambient layer. */
  showGlobe?: boolean;
  className?: string;
}

type Vec3 = { x: number; y: number; z: number };

// Brand palette (matches tailwind flectere tokens)
const GOLD = "197,160,89";
const GOLD_LIGHT = "232,205,150";
const ICE = "180,200,235";

function fibonacciSphere(count: number): Vec3[] {
  const pts: Vec3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

function slerpArc(a: Vec3, b: Vec3, steps: number, lift: number): Vec3[] {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  const sinO = Math.sin(omega) || 1;
  const out: Vec3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const k1 = Math.sin((1 - t) * omega) / sinO;
    const k2 = Math.sin(t * omega) / sinO;
    const h = 1 + Math.sin(Math.PI * t) * lift;
    out.push({
      x: (a.x * k1 + b.x * k2) * h,
      y: (a.y * k1 + b.y * k2) * h,
      z: (a.z * k1 + b.z * k2) * h,
    });
  }
  return out;
}

/**
 * Lightweight canvas-based 3D motion layer: a rotating particle globe with
 * orbital rings, travelling connection arcs and a deep starfield. Reacts to
 * pointer (parallax tilt) and scroll, pauses when off-screen and honours
 * prefers-reduced-motion. No WebGL / external dependencies.
 */
export function MotionBackground3D({
  anchorX = 0.72,
  intensity = 1,
  showGlobe = true,
  className = "",
}: MotionBackground3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;

    const globe = fibonacciSphere(window.innerWidth < 768 ? 520 : 980);

    // Orbital rings: tilted circles of particles around the globe
    const rings = [
      { radius: 1.45, tilt: 1.15, spin: 0.9, count: 220, color: GOLD },
      { radius: 1.75, tilt: -0.55, spin: -0.6, count: 260, color: ICE },
      { radius: 2.1, tilt: 0.25, spin: 0.35, count: 180, color: GOLD_LIGHT },
    ].map((r) => ({
      ...r,
      offsets: Array.from({ length: r.count }, (_, i) => (i / r.count) * Math.PI * 2 + Math.random() * 0.02),
    }));

    // Starfield in a deep box, drifting toward the camera
    const STAR_COUNT = window.innerWidth < 768 ? 140 : 280;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 10,
      z: Math.random() * 14 + 1,
      gold: Math.random() < 0.25,
    }));

    // Connection arcs between random globe points
    type Arc = { pts: Vec3[]; born: number; life: number };
    const arcs: Arc[] = [];
    const spawnArc = (now: number) => {
      const a = globe[(Math.random() * globe.length) | 0];
      const b = globe[(Math.random() * globe.length) | 0];
      const d = a.x * b.x + a.y * b.y + a.z * b.z;
      if (d > 0.6 || d < -0.4) return;
      arcs.push({ pts: slerpArc(a, b, 48, 0.25 + Math.random() * 0.2), born: now, life: 3200 + Math.random() * 1800 });
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollFactor = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      isMobile = width < 768;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const rect = canvas.getBoundingClientRect();
      scrollFactor = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const FOV = 3.2;

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      // On phones the globe tucks into the top-right corner, clear of the headline
      const cx = isMobile ? width * 0.92 : width * anchorX;
      const cy = isMobile ? height * 0.14 : height * 0.46;
      const scale = isMobile ? width * 0.3 : Math.min(width, height) * 0.27;
      const globeAlpha = isMobile ? 0.55 : 1;

      const t = now * 0.001;
      const rotY = t * 0.12 + pointer.x * 0.35 + scrollFactor * 1.2;
      const rotX = -0.32 + pointer.y * 0.18;
      const sinY = Math.sin(rotY), cosY = Math.cos(rotY);
      const sinX = Math.sin(rotX), cosX = Math.cos(rotX);

      const project = (p: Vec3) => {
        // rotate Y then X
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const persp = FOV / (FOV + z2);
        return { sx: cx + x1 * scale * persp, sy: cy + y2 * scale * persp, z: z2, persp };
      };

      // --- Starfield ---
      const starSpeed = reduceMotion ? 0 : 0.0016 * dt;
      for (const s of stars) {
        s.z -= starSpeed;
        if (s.z < 0.4) {
          s.z = 15;
          s.x = (Math.random() - 0.5) * 16;
          s.y = (Math.random() - 0.5) * 10;
        }
        const persp = 1 / s.z;
        const sx = width / 2 + (s.x - pointer.x * 0.6) * persp * width * 0.5;
        const sy = height / 2 + (s.y - pointer.y * 0.4) * persp * width * 0.5;
        if (sx < -4 || sx > width + 4 || sy < -4 || sy > height + 4) continue;
        const a = Math.min(1, (15 - s.z) / 8) * 0.55 * intensity;
        const size = Math.max(0.6, 2.2 * persp * 2);
        ctx.fillStyle = `rgba(${s.gold ? GOLD_LIGHT : ICE},${a})`;
        ctx.fillRect(sx, sy, size, size);
      }

      if (!showGlobe) return;

      // --- Soft core glow ---
      const glow = ctx.createRadialGradient(cx, cy, scale * 0.2, cx, cy, scale * 1.9);
      glow.addColorStop(0, `rgba(${GOLD},${0.14 * intensity})`);
      glow.addColorStop(0.5, `rgba(26,54,104,${0.18 * intensity})`);
      glow.addColorStop(1, "rgba(6,14,30,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - scale * 2, cy - scale * 2, scale * 4, scale * 4);

      // --- Globe particles ---
      for (const p of globe) {
        const { sx, sy, z, persp } = project(p);
        const front = (1 - z) / 2; // 1 = nearest
        const a = (0.08 + front * front * 0.85) * intensity * globeAlpha;
        const size = (0.7 + front * 1.6) * persp;
        ctx.fillStyle = `rgba(${front > 0.55 ? GOLD_LIGHT : GOLD},${a})`;
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      }

      // --- Orbital rings ---
      for (const ring of rings) {
        const spin = t * ring.spin * 0.25;
        const st = Math.sin(ring.tilt), ct = Math.cos(ring.tilt);
        for (let i = 0; i < ring.offsets.length; i++) {
          const ang = ring.offsets[i] + spin;
          const px = Math.cos(ang) * ring.radius;
          const pz = Math.sin(ang) * ring.radius;
          const p = { x: px, y: pz * st, z: pz * ct };
          const { sx, sy, z, persp } = project(p);
          const front = Math.max(0, Math.min(1, (ring.radius - z) / (ring.radius * 2)));
          // Fade a moving "comet" highlight along each ring
          const head = (Math.sin(ang * 1 - t * 1.4) + 1) / 2;
          const a = (0.05 + front * 0.35 + Math.pow(head, 12) * 0.6) * intensity * globeAlpha;
          const size = (0.6 + front * 1.4 + Math.pow(head, 12) * 1.5) * persp;
          ctx.fillStyle = `rgba(${ring.color},${a})`;
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        }
      }

      // --- Connection arcs ---
      if (!reduceMotion && arcs.length < (isMobile ? 4 : 8) && Math.random() < 0.05) spawnArc(now);
      ctx.lineWidth = 1.1;
      ctx.lineCap = "round";
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        const age = (now - arc.born) / arc.life;
        if (age >= 1) {
          arcs.splice(i, 1);
          continue;
        }
        const headIdx = Math.min(arc.pts.length - 1, Math.floor(age * 1.6 * arc.pts.length));
        const tailIdx = Math.max(0, Math.floor((age * 1.6 - 0.6) * arc.pts.length));
        const fade = age > 0.75 ? (1 - age) / 0.25 : 1;
        let prev = project(arc.pts[tailIdx]);
        for (let j = tailIdx + 1; j <= headIdx; j++) {
          const cur = project(arc.pts[j]);
          const front = (1 - cur.z) / 2;
          const k = (j - tailIdx) / Math.max(1, headIdx - tailIdx);
          ctx.strokeStyle = `rgba(${GOLD_LIGHT},${(0.15 + front * 0.6) * k * fade * intensity * globeAlpha})`;
          ctx.beginPath();
          ctx.moveTo(prev.sx, prev.sy);
          ctx.lineTo(cur.sx, cur.sy);
          ctx.stroke();
          prev = cur;
        }
        // Glowing head
        if (headIdx < arc.pts.length - 1) {
          const h = project(arc.pts[headIdx]);
          ctx.fillStyle = `rgba(255,240,210,${0.9 * fade * intensity})`;
          ctx.beginPath();
          ctx.arc(h.sx, h.sy, 1.8 * h.persp, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;

    const loop = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      draw(now, dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduceMotion) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) draw(performance.now(), 0);
    else start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [anchorX, intensity, showGlobe]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
