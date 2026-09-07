import {
  Zap,
  Container,
  BarChart3,
  ShieldCheck,
  GitCompareArrows,
  Activity,
  GitBranch,
  Server,
  LineChart,
} from "lucide-react";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { Reveal } from "@/components/animations/Reveal";

const FEATURES = [
  { icon: Zap, title: "FastAPI", description: "Asynchronous, type-validated endpoints built for low-latency inference at scale." },
  { icon: Container, title: "Docker", description: "Fully containerized service for reproducible builds across every environment." },
  { icon: BarChart3, title: "Prometheus", description: "Instrumented metrics exposed for real-time observability and alerting." },
  { icon: ShieldCheck, title: "Champion Model", description: "The current production model serving the majority of live traffic.", accent: "signal" as const },
  { icon: GitCompareArrows, title: "Challenger Model", description: "A candidate model evaluated in parallel before promotion to champion.", accent: "violet" as const },
  { icon: Activity, title: "Drift Detection", description: "Continuous statistical monitoring flags feature and prediction drift early." },
  { icon: GitBranch, title: "CI/CD", description: "Automated testing and deployment pipelines via GitHub Actions." },
  { icon: Server, title: "Render", description: "Zero-downtime cloud deployment with automatic health checks." },
  { icon: LineChart, title: "Metrics", description: "Granular latency, throughput, and resource metrics for every request." },
];

export function FeatureGrid() {
  return (
    <section className="container py-20">
      <Reveal className="mx-auto mb-12 max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          A microservice built like production, not a demo
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Every layer of the stack — from model serving to monitoring — mirrors what ships in a
          real ML platform.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={Math.min(i * 0.05, 0.3)}>
            <FeatureCard {...feature} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
