"use client";

import React, { useEffect, useRef } from "react";

interface FloatingShapesProps {
  /** Mirror the composition so neighbouring sections don't look identical. */
  flip?: boolean;
}

const CUBE_FACES = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(-90deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

function WireCube({ size }: { size: number }) {
  return (
    <div style={{ width: size, height: size, perspective: 800 }}>
      <div
        className="sfx-anim relative w-full h-full"
        style={{ transformStyle: "preserve-3d", animation: "sfx-spin3d 22s linear infinite" }}
      >
        {CUBE_FACES.map((f) => (
          <div
            key={f}
            className="absolute inset-0 border border-flectere-gold/40 bg-flectere-gold/[0.03]"
            style={{ transform: `${f} translateZ(${size / 2}px)` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Decorative parallax layer for light sections: a spinning wireframe cube,
 * orbit rings, a dot lattice and soft gold orbs that drift at different
 * depths as the page scrolls. Parent section needs `relative isolate`.
 */
export function FloatingShapes({ flip = false }: FloatingShapesProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      for (const l of layers) {
        const d = parseFloat(l.dataset.depth || "0");
        l.style.translate = `0 ${(p * d * 160).toFixed(1)}px`;
        l.style.rotate = `${(p * d * 25).toFixed(1)}deg`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const side = (left: string) => (flip ? { right: left } : { left });
  const other = (right: string) => (flip ? { left: right } : { right });

  return (
    <div ref={rootRef} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft gold orbs */}
      <div data-depth="0.6" className="absolute top-[8%] w-72 h-72 rounded-full bg-flectere-gold/10 blur-3xl" style={other("-4%")} />
      <div data-depth="-0.4" className="absolute bottom-[6%] w-80 h-80 rounded-full bg-flectere-navyLight/10 blur-3xl" style={side("-6%")} />

      {/* 3D wireframe cube */}
      <div data-depth="1" className="absolute top-[14%] hidden sm:block opacity-80" style={other("7%")}>
        <WireCube size={88} />
      </div>
      <div data-depth="-0.8" className="absolute bottom-[18%] hidden lg:block opacity-60" style={side("4%")}>
        <WireCube size={52} />
      </div>

      {/* Orbit rings */}
      <div data-depth="0.5" className="absolute top-[45%] hidden md:block" style={side("3%")}>
        <div
          className="sfx-anim w-40 h-40 rounded-full border border-dashed border-flectere-gold/35"
          style={{ animation: "sfx-spin 40s linear infinite" }}
        >
          <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-flectere-gold shadow-[0_0_10px_rgba(197,160,89,0.9)]" />
        </div>
      </div>
      <div data-depth="-0.6" className="absolute bottom-[10%]" style={other("12%")}>
        <div
          className="sfx-anim w-24 h-24 rounded-full border-2 border-flectere-navy/10"
          style={{ animation: "sfx-float 9s ease-in-out infinite" }}
        />
      </div>

      {/* Dot lattice */}
      <div
        data-depth="0.3"
        className="absolute top-[4%] w-48 h-32 opacity-40"
        style={{
          ...side("10%"),
          backgroundImage: "radial-gradient(rgba(197,160,89,0.55) 1.2px, transparent 1.4px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Floating diamonds */}
      <div data-depth="1.3" className="absolute top-[62%] hidden sm:block" style={other("26%")}>
        <div
          className="sfx-anim w-5 h-5 border border-flectere-gold/60"
          style={{ rotate: "45deg", animation: "sfx-float 7s ease-in-out infinite" }}
        />
      </div>
      <div data-depth="-1.1" className="absolute top-[30%]" style={side("22%")}>
        <div
          className="sfx-anim w-3 h-3 bg-flectere-gold/50"
          style={{ rotate: "45deg", animation: "sfx-float 6s ease-in-out infinite reverse" }}
        />
      </div>
    </div>
  );
}
