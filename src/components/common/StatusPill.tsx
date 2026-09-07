import { cn } from "@/utils/cn";
import type { ConnectionState } from "@/types/metrics";

const CONFIG: Record<ConnectionState, { label: string; dot: string; text: string }> = {
  online: { label: "Online", dot: "bg-online", text: "text-online" },
  offline: { label: "Offline", dot: "bg-offline", text: "text-offline" },
  checking: { label: "Checking", dot: "bg-warn", text: "text-warn" },
};

interface StatusPillProps {
  status: ConnectionState;
  className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-abyss-800/60 px-3 py-1.5 font-mono text-xs",
        className
      )}
      role="status"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            status !== "checking" && "animate-ping",
            config.dot
          )}
        />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", config.dot)} />
      </span>
      <span className={config.text}>{config.label}</span>
    </span>
  );
}
