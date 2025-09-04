"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  duration?: number; // ms
  delay?: number; // ms
  from?: number; // starting value (default 0)
  once?: boolean; // animate only the first time in view
  easing?: (t: number) => number; // custom easing (t in [0,1])
  children: React.ReactElement;
}

// Smooth ease-out
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CountUp: React.FC<CountUpProps> = ({
  duration = 2000,
  delay = 0,
  from = 0,
  once = true,
  easing = easeOutCubic,
  children,
}) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const playedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [animatedText, setAnimatedText] = useState<string | null>(null);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [target, setTarget] = useState<number>(0);

  // Parse initial content once on mount (client only)
  useEffect(() => {
    if (!wrapperRef.current) return;
    const fullText = (wrapperRef.current.textContent || "").trim();

    // Capture optional prefix, a number (with commas/decimals), then the rest as suffix
    const match = fullText.match(/^\s*([^\d+-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);

    if (match) {
      const [, pfx, numStr, sfx] = match;
      setPrefix(pfx);
      setSuffix(sfx);
      const numeric = parseFloat(numStr.replace(/,/g, ""));
      setTarget(Number.isFinite(numeric) ? numeric : 0);
    } else {
      // Fallback: no number found; keep entire text as suffix, animate 0→0
      setPrefix("");
      setSuffix(fullText);
      setTarget(0);
    }
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const el = wrapperRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const shouldPlay = once ? !playedRef.current : true;
        if (entry.isIntersecting && shouldPlay) {
          playedRef.current = true;
          window.setTimeout(() => {
            animate(from, target, duration);
          }, delay);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, from, once, target]);

  const animate = (start: number, end: number, ms: number) => {
    if (ms <= 0) {
      setAnimatedText(`${prefix}${Math.round(end)}${suffix}`);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / ms, 1);
      const eased = easing(progress);
      const value = Math.round(start + (end - start) * eased);
      setAnimatedText(`${prefix}${value}${suffix}`);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Initialize with starting value immediately
    setAnimatedText(`${prefix}${Math.round(start)}${suffix}`);
    rafRef.current = requestAnimationFrame(tick);
  };

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Render: keep original children on server/first paint to avoid hydration mismatch.
  return (
    <span ref={wrapperRef} style={{ display: "inline-block" }}>
      {React.cloneElement(children, {
        children: animatedText ?? children.props.children,
      })}
    </span>
  );
};

export default CountUp;
