import React from "react";

interface PrestigeLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export function PrestigeLogo({
  className = "",
  variant = "dark",
  size = "md",
}: PrestigeLogoProps) {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: "h-9",
    md: "h-11",
    lg: "h-14",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Crest Shield Icon */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-xl transition-all ${
          size === "sm" ? "w-9 h-9" : size === "lg" ? "w-14 h-14" : "w-11 h-11"
        } ${
          isLight
            ? "bg-flectere-navy text-flectere-gold shadow-md"
            : "bg-gradient-to-br from-flectere-gold to-[#956E24] text-flectere-navy shadow-lg shadow-flectere-gold/20"
        } border ${isLight ? "border-flectere-slateLight" : "border-flectere-gold/40"}`}
      >
        <svg
          viewBox="0 0 40 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6"}
        >
          {/* Outer Shield Outline */}
          <path
            d="M20 2L35 7V21C35 30.5 28.5 38.5 20 42C11.5 38.5 5 30.5 5 21V7L20 2Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Inner Monogram 'P' */}
          <path
            d="M16 12H22.5C24.433 12 26 13.567 26 15.5C26 17.433 24.433 19 22.5 19H16V30"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Laurel Accent */}
          <path
            d="M12 25C13.5 26.5 16.5 27 20 27C23.5 27 26.5 26.5 28 25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif tracking-wider font-bold leading-none ${
            size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base"
          } ${isLight ? "text-flectere-navy" : "text-white"}`}
        >
          PRESTIGE
        </span>
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.2em] font-medium uppercase mt-0.5 ${
            isLight ? "text-flectere-slate" : "text-flectere-goldLight/90"
          }`}
        >
          International Academy
        </span>
      </div>
    </div>
  );
}
