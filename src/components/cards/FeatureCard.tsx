import type { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "signal" | "violet";
}

export function FeatureCard({ icon: Icon, title, description, accent = "signal" }: FeatureCardProps) {
  const accentClasses =
    accent === "violet"
      ? "from-challenger/20 to-challenger/5 text-challenger"
      : "from-signal-400/20 to-signal-400/5 text-signal-400";

  return (
    <GlassCard hover className="h-full">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accentClasses}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-[15px] font-semibold text-slate-100">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </GlassCard>
  );
}
