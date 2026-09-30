"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const subscribe = () => () => {};
const getHasPreloaded = () =>
  typeof window !== "undefined" && Boolean(sessionStorage.getItem("excess_preloaded"));
const getServerSnapshot = () => false;

/**
 * Full-screen Brand Preloader.
 * Shown once per user session (guarded via sessionStorage) to create a premium,
 * high-tech solar power energizing experience on initial visit.
 * Smoothly transitions out with cubic-bezier easing after ~2.4 seconds.
 */
export function Preloader() {

  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasPreloaded = useSyncExternalStore(subscribe, getHasPreloaded, getServerSnapshot);

  useEffect(() => {
    // Only run on the client if not preloaded
    if (typeof window === "undefined" || sessionStorage.getItem("excess_preloaded")) return;

    // Prevent body scrolling during cinematic preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress animation: smoothly accelerates, slows down slightly, then caps to 100%
    const startTime = performance.now();
    const duration = 2300; // 2.3 seconds

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Easing curve: smooth cubic ease-out
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentPercent = Math.min(100, Math.floor(eased * 100));

      setProgress(currentPercent);

      if (t < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Trigger fade out
        setProgress(100);
        setTimeout(() => {
          setIsFading(true);
          sessionStorage.setItem("excess_preloaded", "true");
          document.body.style.overflow = originalOverflow;

          // Remove entirely from DOM after exit animation completes
          setTimeout(() => {
            setIsDone(true);
          }, 700);
        }, 200);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (hasPreloaded || isDone) {
    return null;
  }

  // Dynamic system status text based on energizing phase
  const getStatusText = (pct: number) => {
    if (pct < 30) return "Initializing clean power grid...";
    if (pct < 70) return "Connecting solar cells...";
    if (pct < 98) return "Optimizing battery storage...";
    return "System ready • Powering uninterrupted lives";
  };

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Loading Excess Energy"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b12] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFading
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Background ambient solar radial glow */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.15)_0%,rgba(7,11,18,0.95)_70%)]" 
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Brand Logo with energy halo */}
        <div className="relative mb-6 flex items-center justify-center">
          <div 
            className="absolute size-24 rounded-full bg-amber-400/20 blur-xl animate-pulse" 
            aria-hidden="true"
          />
          <Image
            src="/images/logos/logo.png"
            alt="Excess Energy"
            width={160}
            height={50}
            priority
            className="h-12 w-auto object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,193,7,0.4)]"
          />
        </div>

        {/* Tagline */}
        <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90 mb-1">
          Excess Energy
        </h2>
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400/80 mb-8 font-medium">
          Solar &bull; Storage &bull; Security
        </p>

        {/* Energy Progress Bar */}
        <div className="w-56 sm:w-64">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[1px] shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-[width] duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Electric spark head */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 size-2 rounded-full bg-white shadow-[0_0_8px_#ffc107]" 
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Progress Percent and Status */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/60">
            <span className="truncate pr-2">{getStatusText(progress)}</span>
            <span className="text-amber-400 font-semibold shrink-0">{progress}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
