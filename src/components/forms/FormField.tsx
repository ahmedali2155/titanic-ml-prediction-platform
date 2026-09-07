import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface FormFieldProps extends PropsWithChildren {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
}

export function FormField({ label, htmlFor, error, hint, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-xs font-medium text-slate-300">
          {label}
        </label>
        {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-[11px] font-medium text-offline" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
