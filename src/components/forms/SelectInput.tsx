import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, hasError, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-xl border border-slate-700/60 bg-abyss-800/60 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors",
          "focus:border-signal-400/60 focus:ring-2 focus:ring-signal-400/20",
          hasError && "border-offline/60 focus:border-offline focus:ring-offline/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  )
);
SelectInput.displayName = "SelectInput";
