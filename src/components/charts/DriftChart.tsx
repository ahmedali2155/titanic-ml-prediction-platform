import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { GlassCard } from "@/components/cards/GlassCard";
import type { DriftResponse } from "@/types/metrics";

interface DriftChartProps {
  data: DriftResponse | null;
  isLoading: boolean;
}

export function DriftChart({
  data,
  isLoading,
}: DriftChartProps) {
  const chartData = data?.statistics
    ? Object.entries(data.statistics).map(([feature, stats]) => ({
        feature,
        score: stats.ks_statistic,
        pValue: stats.p_value,
        drifted: data.drifted_features?.includes(feature) ?? false,
      }))
    : [];

  return (
    <GlassCard className="h-full">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.35em] text-slate-500">
            Monitoring
          </p>

          <h3 className="text-lg font-semibold text-slate-100">
            Feature Drift
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Kolmogorov–Smirnov statistics from live production traffic.
          </p>
        </div>

        {data && (
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
              data.drift_detected
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {data.drift_detected ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}

            {data.drift_detected
              ? "Drift Detected"
              : "No Drift"}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="skeleton h-72 w-full rounded-xl" />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="feature"
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
            />

            <YAxis />

            <Tooltip
              formatter={(value: number) => [
                value.toFixed(3),
                "KS Statistic",
              ]}
            />

            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.feature}
                  fill={
                    entry.drifted
                      ? "#ef4444"
                      : "#22d3ee"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {data && (
        <div className="mt-6 border-t border-slate-800 pt-5">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />

            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Feature Statistics
            </p>
          </div>

          <div className="grid gap-2">
            {chartData.map((item) => (
              <div
                key={item.feature}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 px-3 py-2"
              >
                <span className="font-medium text-slate-200">
                  {item.feature}
                </span>

                <div className="text-right">
                  <div className="font-mono text-cyan-400">
                    KS {item.score.toFixed(3)}
                  </div>

                  <div className="text-xs text-slate-500">
                    p={item.pValue.toFixed(4)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-xs text-slate-500">
            Production Samples:{" "}
            <span className="font-semibold text-slate-300">
              {data.production_samples ?? 0}
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}