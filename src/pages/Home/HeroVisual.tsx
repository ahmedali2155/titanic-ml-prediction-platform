import { motion } from "framer-motion";
import { ShieldCheck, GitCompareArrows, Activity } from "lucide-react";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "Champion Model",
    sub: "Random Forest · v2.3",
    metric: "83.4% accuracy",
    accent: "text-champion",
    className: "left-0 top-6 lg:-left-4",
    float: { y: [0, -12, 0], duration: 6 },
  },
  {
    icon: GitCompareArrows,
    title: "Challenger Model",
    sub: "Gradient Boosted · v3.0",
    metric: "84.1% accuracy",
    accent: "text-challenger",
    className: "right-0 top-0 lg:-right-2",
    float: { y: [0, 10, 0], duration: 7 },
  },
  {
    icon: Activity,
    title: "Drift Monitor",
    sub: "PSI · 6 features tracked",
    metric: "0.04 drift score",
    accent: "text-current-400",
    className: "bottom-0 left-8 lg:left-16",
    float: { y: [0, -9, 0], duration: 5.5 },
  },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-md lg:h-[440px]">
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-400/20" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-400/10" />

      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-signal-400/40 bg-abyss-800/80 shadow-glow backdrop-blur-xl">
        <span className="font-mono text-[10px] font-semibold text-signal-400">/predict</span>
      </div>

      {CARDS.map(({ icon: Icon, title, sub, metric, accent, className, float }) => (
        <motion.div
          key={title}
          animate={{ y: float.y }}
          transition={{ duration: float.duration, repeat: Infinity, ease: "easeInOut" }}
          className={`glass-panel absolute w-52 p-4 shadow-glass ${className}`}
        >
          <div className="flex items-center gap-2.5">
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ${accent}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-100">{title}</p>
              <p className="text-[11px] text-slate-500">{sub}</p>
            </div>
          </div>
          <p className={`mt-3 font-mono text-[11px] ${accent}`}>{metric}</p>
        </motion.div>
      ))}
    </div>
  );
}
