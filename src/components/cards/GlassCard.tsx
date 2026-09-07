import type { PropsWithChildren, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface GlassCardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false, ...rest }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel p-6",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-signal-400/40 hover:shadow-glow",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
