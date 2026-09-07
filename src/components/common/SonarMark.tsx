import { cn } from "@/utils/cn";

interface SonarMarkProps {
  className?: string;
  animated?: boolean;
}

/**
 * The brand mark: a sonar ping motif tying the ML "detection" theme
 * to the platform's maritime subject matter.
 */
export function SonarMark({ className, animated = true }: SonarMarkProps) {
  return (
    <span className={cn("relative flex h-8 w-8 items-center justify-center", className)}>
      {animated && (
        <span className="absolute h-full w-full animate-pulse-ring rounded-full border border-signal-400/60" />
      )}
      <svg viewBox="0 0 32 32" className="relative h-8 w-8">
        <circle cx="16" cy="16" r="15" fill="#0c1220" stroke="#182238" strokeWidth="1" />
        <circle cx="16" cy="16" r="10" fill="none" stroke="#38bdf8" strokeWidth="1.4" opacity="0.55" />
        <circle cx="16" cy="16" r="5.5" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity="0.8" />
        <circle cx="16" cy="16" r="2.2" fill="url(#sonarGrad)" />
        <defs>
          <linearGradient id="sonarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
