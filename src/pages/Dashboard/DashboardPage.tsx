import {
  Activity,
  Cpu,
  Gauge,
  HardDrive,
  Timer,
  TrendingUp,
  RefreshCw,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { MetricCard } from "@/components/cards/MetricCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatusPill } from "@/components/common/StatusPill";
import { DriftChart } from "@/components/charts/DriftChart";
import { ABChart } from "@/components/charts/ABChart";
import { Reveal } from "@/components/animations/Reveal";

import { useHealthCheck } from "@/hooks/useHealthCheck";
import {
  useMetrics,
  useDriftMetrics,
  useABMetrics,
} from "@/hooks/useDashboardData";

import {
  formatBytes,
  formatLatency,
  formatNumber,
  formatPercent,
  formatTimestamp,
} from "@/utils/format";

export function DashboardPage() {
  const { health, status } = useHealthCheck();

  const {
    data: metrics,
    isLoading: metricsLoading,
  } = useMetrics();

  const {
    data: drift,
    isLoading: driftLoading,
  } = useDriftMetrics();

  const {
    data: ab,
    isLoading: abLoading,
  } = useABMetrics();

 const lastUpdated = String(
  health?.timestamp ??
    metrics?.timestamp ??
    new Date().toISOString()
);

  return (
    <section className="container py-16">
      {/* Header */}
      <Reveal className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-slate-500">
            Production Monitoring
          </p>

          <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
            Live ML Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Monitor prediction traffic, latency, infrastructure health,
            feature drift, and Champion/Challenger deployment performance
            in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={status} />

          {health?.version && (
            <span className="label-mono rounded-full border border-slate-700/60 px-3 py-1.5 text-slate-400">
              v{health.version}
            </span>
          )}

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            Champion Model Active
          </span>
        </div>
      </Reveal>

      {/* KPI Cards */}
      <Reveal delay={0.05}>
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
          <MetricCard
            icon={Activity}
            label="Predictions"
            value={formatNumber(
              metrics?.prediction_count ?? metrics?.total_requests
            )}
            loading={metricsLoading}
          />

          <MetricCard
            icon={Timer}
            label="Avg Latency"
            value={formatLatency(metrics?.avg_latency_ms)}
            loading={metricsLoading}
          />

          <MetricCard
            icon={Gauge}
            label="P95 Latency"
            value={formatLatency(metrics?.p95_latency_ms)}
            loading={metricsLoading}
          />

          <MetricCard
            icon={HardDrive}
            label="Memory"
            value={formatBytes(
              metrics?.memory_usage_mb
                ? metrics.memory_usage_mb * 1024 * 1024
                : undefined
            )}
            loading={metricsLoading}
          />

          <MetricCard
            icon={Cpu}
            label="CPU"
            value={formatPercent(metrics?.cpu_usage_percent)}
            loading={metricsLoading}
          />

          <MetricCard
            icon={TrendingUp}
            label="Req / Min"
            value={formatNumber(metrics?.requests_per_minute)}
            loading={metricsLoading}
          />
        </div>
      </Reveal>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <DriftChart
            data={drift}
            isLoading={driftLoading}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <ABChart
            data={ab}
            isLoading={abLoading}
          />
        </Reveal>
      </div>

      {/* Footer */}
      <Reveal delay={0.2} className="mt-6">
        <GlassCard className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-signal-400" />
              Auto refresh every 15 seconds
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-online" />
              Health check every 30 seconds
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-slate-500" />
              Last updated: {formatTimestamp(lastUpdated)}
            </div>
          </div>

          <div className="text-right">
            <p className="label-mono text-slate-500">
              Data Source
            </p>

            <p className="font-mono text-sm text-slate-300">
              prosensia-ml-api.onrender.com
            </p>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}