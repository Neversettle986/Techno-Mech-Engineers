// src/components/LenisScroller.tsx
"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisScroller({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // 3. Sync Lenis scroll with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 4. Connect Lenis to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 5. Disable GSAP internal lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
