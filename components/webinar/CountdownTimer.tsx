"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  variant?: "hero" | "page" | "banner";
  onExpire?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function CountdownTimer({ targetDate, variant = "page", onExpire }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetDate));

    const interval = setInterval(() => {
      const tl = getTimeLeft(targetDate);
      setTimeLeft(tl);
      if (tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Min" },
    { value: pad(timeLeft.seconds), label: "Sec" },
  ];

  if (!mounted) return null;

  if (variant === "hero") {
    return (
      <div className="flex items-center gap-2">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div className="countdown-unit">
              <span className="text-2xl md:text-3xl font-serif text-white font-semibold tabular-nums">
                {unit.value}
              </span>
              <span className="text-[10px] text-accent-gold/70 font-accent uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-accent-gold text-xl font-light">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="flex items-center gap-1 font-accent font-bold text-lg tabular-nums">
        <span>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</span>
      </div>
    );
  }

  // Default "page" variant
  return (
    <div className="flex items-center gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center",
                "bg-white/10 border border-accent-gold/30"
              )}
            >
              <span className="text-3xl font-serif text-white font-semibold tabular-nums">
                {unit.value}
              </span>
            </div>
            <span className="mt-2 text-xs text-accent-gold/70 font-accent uppercase tracking-widest">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-accent-gold/60 text-2xl font-light mb-6">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
