import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { GlassCard } from "./GlassCard";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  loading?: boolean;
}

export function MetricCard({ icon: Icon, label, value, trend, trendPositive, loading }: MetricCardProps) {
  return (
    <GlassCard className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="label-mono uppercase text-slate-500">{label}</span>
        <Icon className="h-4 w-4 text-signal-400" />
      </div>

      {loading ? (
        <div className="skeleton h-8 w-24" />
      ) : (
        <span className="font-display text-2xl font-semibold text-slate-100">{value}</span>
      )}

      {trend && !loading && (
        <span className={cn("text-xs font-medium", trendPositive ? "text-online" : "text-slate-500")}>
          {trend}
        </span>
      )}
    </GlassCard>
  );
}
