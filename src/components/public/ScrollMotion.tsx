"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide scroll choreography for the public pages. Mounted once (from
 * PublicHeader) it scans every <section> and, without touching component
 * markup, gives:
 *  - 3D headline reveals (rotateX rise + de-blur)
 *  - staggered card entrances that flip in from alternating sides
 *  - image curtain reveals with continuous parallax drift
 *  - pointer-driven 3D tilt on cards
 *  - hero content that lifts and fades away as you scroll ([data-sfx-hero])
 *  - a gold reading-progress bar
 * Elements that already carry Tailwind transform classes only fade, so their
 * own hover/positioning transforms are never overridden. Everything is
 * skipped under prefers-reduced-motion.
 */

const TRANSFORM_CLASS = /(^|\s)(-?translate-|-?rotate-|scale-|transform|animate-|skew-)/;

function hasTransformClass(el: Element) {
  return TRANSFORM_CLASS.test(el.getAttribute("class") || "");
}

function isCard(el: Element) {
  const c = el.getAttribute("class") || "";
  return /rounded-(xl|2xl|3xl)/.test(c) && /(border|shadow|bg-)/.test(c);
}

export function ScrollMotion() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finish = (el: HTMLElement) => {
      el.removeAttribute("data-sfx");
      el.removeAttribute("data-sfx-owner");
      el.style.removeProperty("--sfx-delay");
      el.dataset.sfxDone = "1";
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("sfx-in");
          const delay = parseFloat(el.style.getPropertyValue("--sfx-delay")) || 0;
          window.setTimeout(() => {
            el.classList.remove("sfx-in");
            finish(el);
          }, 1400 + delay);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const observed = new WeakSet<Element>();
    const owner = Math.random().toString(36).slice(2);

    const tag = (el: Element, fx: string, delay = 0) => {
      const h = el as HTMLElement;
      if (h.dataset.sfxDone || observed.has(h)) return;
      // Already tagged by an instance from the previous page (client-side
      // navigation): adopt it, otherwise it would stay hidden forever.
      if (h.dataset.sfx) {
        h.dataset.sfxOwner = owner;
        observed.add(h);
        io.observe(h);
        return;
      }
      if (h.closest("[data-sfx-hero], header, footer, [role=dialog], .fixed")) return;
      // Never hide something already scrolled past
      if (h.getBoundingClientRect().bottom < 0) return;
      h.dataset.sfx = hasTransformClass(h) ? "fade" : fx;
      if (delay) h.style.setProperty("--sfx-delay", `${delay}ms`);
      h.dataset.sfxOwner = owner;
      observed.add(h);
      io.observe(h);
    };

    const parallaxImgs = new Set<HTMLElement>();
    const tiltCards = new Set<HTMLElement>();

    const scan = () => {
      document.querySelectorAll("section").forEach((section) => {
        if (section.closest("[data-sfx-hero]") || section.hasAttribute("data-sfx-hero")) return;

        section.querySelectorAll("h1, h2").forEach((el) => tag(el, "rise3d"));
        section.querySelectorAll("h2 + p, h1 + p, h2 ~ p").forEach((el) => tag(el, "fade-up", 120));

        section.querySelectorAll<HTMLElement>("[class*='grid-cols']").forEach((grid) => {
          if (grid.closest("[data-sfx-done-grid]")) return;
          const kids = Array.from(grid.children);
          if (kids.length < 2) return;
          grid.style.perspective = "1400px";
          kids.forEach((kid, i) => {
            const card = isCard(kid);
            tag(kid, card ? (i % 2 ? "flip-r" : "flip-l") : "zoom", Math.min(i, 8) * 90);
            if (card && !hasTransformClass(kid)) tiltCards.add(kid as HTMLElement);
          });
        });

        section.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
          tag(img, "clip");
          const parent = img.parentElement;
          if (parent && getComputedStyle(parent).overflow === "hidden") parallaxImgs.add(img);
        });

        section.querySelectorAll(":scope > div > div").forEach((el) => {
          if (!(el as HTMLElement).dataset.sfx && isCard(el)) tag(el, "zoom");
        });
      });
    };

    // --- Continuous scroll effects (parallax, hero exit, progress) ---
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight;
        const doc = document.documentElement;
        const max = doc.scrollHeight - vh;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

        parallaxImgs.forEach((img) => {
          const r = img.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 across the viewport
          img.style.translate = `0 ${(p * -8).toFixed(2)}%`;
          img.style.scale = "1.18";
        });

        document.querySelectorAll<HTMLElement>("[data-sfx-hero]").forEach((hero) => {
          const r = hero.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, -r.top / Math.max(r.height, 1)));
          hero.querySelectorAll<HTMLElement>("[data-sfx-hero-layer]").forEach((layer) => {
            const depth = parseFloat(layer.dataset.sfxHeroLayer || "1");
            layer.style.transform = `translate3d(0, ${(-p * 220 * depth).toFixed(1)}px, 0) scale(${(1 - p * 0.08 * depth).toFixed(3)})`;
            layer.style.opacity = String(Math.max(0, 1 - p * 1.6 * depth));
            layer.style.filter = p > 0.02 ? `blur(${(p * 6 * depth).toFixed(1)}px)` : "";
          });
        });
      });
    };

    // --- Pointer-driven 3D tilt on cards ---
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const card = (e.target as Element).closest?.("[data-sfx-tilt]") as HTMLElement | null;
      tiltCards.forEach((c) => {
        if (c !== card && c.style.rotate) {
          c.style.rotate = "";
        }
      });
      if (!card || card.dataset.sfx) return;
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      const mag = Math.min(9, Math.hypot(dx, dy) * 16);
      card.style.rotate = `${(-dy).toFixed(3)} ${dx.toFixed(3)} 0 ${mag.toFixed(2)}deg`;
    };

    const markTilt = () => tiltCards.forEach((c) => (c.dataset.sfxTilt = "1"));

    // Defer the first scan a moment: on client-side navigation the router
    // resets the scroll position after this effect runs, and scanning at the
    // old position would treat the new page as already scrolled past.
    let rescanTimer = window.setTimeout(() => {
      scan();
      markTilt();
      onScroll();
    }, 120);
    const mo = new MutationObserver(() => {
      window.clearTimeout(rescanTimer);
      rescanTimer = window.setTimeout(() => {
        scan();
        markTilt();
      }, 150);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      // Release anything this instance left waiting (and no newer instance has
      // adopted) so nothing is left invisible
      document.querySelectorAll<HTMLElement>(`[data-sfx-owner="${owner}"][data-sfx]`).forEach((el) => {
        el.classList.remove("sfx-in");
        finish(el);
      });
      window.clearTimeout(rescanTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none bg-gradient-to-r from-flectere-gold via-[#F3D58C] to-flectere-gold shadow-[0_0_12px_rgba(197,160,89,0.8)]"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
