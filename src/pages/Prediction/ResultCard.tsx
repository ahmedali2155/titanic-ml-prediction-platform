import { motion } from "framer-motion";
import {
  LifeBuoy,
  Skull,
  Cpu,
  Fingerprint,
  Timer,
  Clock,
  Percent,
  ShieldCheck,
} from "lucide-react";

import { GlassCard } from "@/components/cards/GlassCard";
import {
  formatLatency,
  formatPercent,
  formatTimestamp,
  shortenId,
} from "@/utils/format";

import type { NormalizedPrediction } from "@/types/prediction";

interface ResultCardProps {
  result: NormalizedPrediction;
}

export function ResultCard({ result }: ResultCardProps) {
  const {
    survived,
    probability,
    confidence,
    model,
    predictionId,
    latencyMs,
    timestamp,
  } = result;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="overflow-hidden">
        {/* Prediction */}
        <div className="flex flex-col items-center gap-5 pb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.1,
            }}
            className={`flex h-20 w-20 items-center justify-center rounded-3xl ${
              survived
                ? "bg-online/10 text-online"
                : "bg-offline/10 text-offline"
            }`}
          >
            {survived ? (
              <LifeBuoy className="h-10 w-10" />
            ) : (
              <Skull className="h-10 w-10" />
            )}
          </motion.div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Prediction
            </p>

            <h2
              className={`mt-3 text-3xl font-bold tracking-wide ${
                survived ? "text-online" : "text-offline"
              }`}
            >
              {survived
                ? "PASSENGER SURVIVES"
                : "PASSENGER DID NOT SURVIVE"}
            </h2>
          </div>

          {/* Probability + Confidence */}
          <div className="grid w-full max-w-md grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
              <div className="mb-2 flex items-center justify-center gap-2 text-slate-400">
                <Percent className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">
                  Probability
                </span>
              </div>

              <p className="text-3xl font-bold text-slate-100">
                {formatPercent(probability)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
              <div className="mb-2 flex items-center justify-center gap-2 text-slate-400">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">
                  Confidence
                </span>
              </div>

              <p className="text-3xl font-bold text-slate-100">
                {formatPercent(confidence)}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="h-3 w-full max-w-md overflow-hidden rounded-full bg-abyss-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: formatPercent(probability) }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={`h-full rounded-full ${
                survived
                  ? "bg-gradient-to-r from-online to-current-400"
                  : "bg-gradient-to-r from-offline to-warn"
              }`}
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="border-t border-slate-800/60 pt-6">
          <p className="mb-5 text-center text-xs uppercase tracking-[0.35em] text-slate-500">
            Prediction Metadata
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <DetailItem icon={Cpu} label="Model" value={model} />

            <DetailItem
              icon={Fingerprint}
              label="Prediction ID"
              value={shortenId(predictionId)}
            />

            <DetailItem
              icon={Timer}
              label="Latency"
              value={formatLatency(latencyMs)}
            />

            <DetailItem
              icon={Clock}
              label="Timestamp"
              value={formatTimestamp(timestamp)}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-800/60 bg-slate-900/30 p-3">
      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>

      <span
        className="truncate font-mono text-sm font-semibold text-slate-100"
        title={value}
      >
        {value}
      </span>
    </div>
  );
}