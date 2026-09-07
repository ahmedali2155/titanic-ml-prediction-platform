import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  suffix?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, hasError, suffix, ...props }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-slate-700/60 bg-abyss-800/60 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600",
          "focus:border-signal-400/60 focus:ring-2 focus:ring-signal-400/20",
          hasError && "border-offline/60 focus:border-offline focus:ring-offline/20",
          suffix && "pr-12",
          className
        )}
        {...props}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">
          {suffix}
        </span>
      )}
    </div>
  )
);
TextInput.displayName = "TextInput";
