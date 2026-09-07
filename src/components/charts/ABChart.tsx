import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { GlassCard } from "@/components/cards/GlassCard";
import { formatNumber, formatPercent } from "@/utils/format";
import type { ABMetricsResponse } from "@/types/metrics";

interface ABChartProps {
  data: ABMetricsResponse | null;
  isLoading: boolean;
}

export function ABChart({ data, isLoading }: ABChartProps) {
  const trafficData = [
    { name: "Champion", value: data?.champion_requests ?? 0 },
    { name: "Challenger", value: data?.challenger_requests ?? 0 },
  ];

  const accuracyData = [
    { name: "Champion", value: (data?.champion_accuracy ?? 0) * (data?.champion_accuracy && data.champion_accuracy <= 1 ? 100 : 1) },
    { name: "Challenger", value: (data?.challenger_accuracy ?? 0) * (data?.challenger_accuracy && data.challenger_accuracy <= 1 ? 100 : 1) },
  ];

  const colors = ["#38bdf8", "#a78bfa"];

  return (
    <GlassCard>
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-100">Champion vs. Challenger</h3>
        <p className="mt-0.5 text-xs text-slate-500">Live traffic split and rolling accuracy</p>
      </div>

      {isLoading ? (
        <div className="skeleton h-64 w-full" />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="label-mono mb-2 text-slate-500">Requests served</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={trafficData} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke="#182238" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#182238" }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  cursor={{ fill: "rgba(148,163,184,0.06)" }}
                  contentStyle={{ background: "#0c1220", border: "1px solid #1e293b", borderRadius: 12, fontSize: 12 }}
                  formatter={(value: number) => formatNumber(value)}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {trafficData.map((entry, i) => (
                    <Cell key={entry.name} fill={colors[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <p className="label-mono mb-2 text-slate-500">Accuracy (%)</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={accuracyData} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke="#182238" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#182238" }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} tickLine={false} axisLine={false} width={36} domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: "rgba(148,163,184,0.06)" }}
                  contentStyle={{ background: "#0c1220", border: "1px solid #1e293b", borderRadius: 12, fontSize: 12 }}
                  formatter={(value: number) => formatPercent(value, 2)}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {accuracyData.map((entry, i) => (
                    <Cell key={entry.name} fill={colors[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {data?.traffic_split && (
        <div className="mt-5 flex items-center gap-4 border-t border-slate-800/60 pt-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-champion" /> Champion {formatPercent(data.traffic_split.champion)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-challenger" /> Challenger {formatPercent(data.traffic_split.challenger)}
          </span>
        </div>
      )}
    </GlassCard>
  );
}
