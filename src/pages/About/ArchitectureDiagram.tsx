import { ArrowRight, ArrowDown } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";

const STAGES = [
  { title: "Client", items: ["React 19 SPA", "Axios + x-api-key"] },
  { title: "FastAPI", items: ["Pydantic validation", "Async request handling"] },
  { title: "Model layer", items: ["Champion model", "Challenger model"] },
  { title: "Observability", items: ["Prometheus metrics", "Drift detection"] },
];

const PIPELINE = ["GitHub Actions", "Docker build", "Render deploy", "Health check"];

export function ArchitectureDiagram() {
  return (
    <GlassCard className="overflow-x-auto">
      <p className="label-mono mb-6 text-slate-500">Request lifecycle</p>
      <div className="flex min-w-[720px] items-stretch gap-3 lg:min-w-0">
        {STAGES.map((stage, i) => (
          <div key={stage.title} className="flex flex-1 items-center gap-3">
            <div className="flex-1 rounded-xl border border-slate-700/60 bg-abyss-800/60 p-4">
              <p className="text-sm font-semibold text-slate-100">{stage.title}</p>
              <ul className="mt-2 space-y-1">
                {stage.items.map((item) => (
                  <li key={item} className="text-[11px] text-slate-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < STAGES.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-signal-400/60" />}
          </div>
        ))}
      </div>

      <p className="label-mono mb-4 mt-10 text-slate-500">Deployment pipeline</p>
      <div className="flex min-w-[560px] flex-col items-center gap-2 lg:min-w-0">
        {PIPELINE.map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-full max-w-sm rounded-xl border border-slate-700/60 bg-abyss-800/60 px-4 py-3 text-center text-xs font-medium text-slate-300">
              {step}
            </div>
            {i < PIPELINE.length - 1 && <ArrowDown className="h-4 w-4 text-current-400/60" />}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
