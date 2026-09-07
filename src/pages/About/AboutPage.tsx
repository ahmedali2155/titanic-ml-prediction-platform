import { Boxes, GitCompareArrows, Container, LineChart, GitBranch, Cloud } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { Reveal } from "@/components/animations/Reveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

const SECTIONS = [
  {
    icon: Boxes,
    title: "Machine learning pipeline",
    body: "Passenger features are cleaned, encoded, and scaled through a scikit-learn pipeline before reaching either model. The same preprocessing path is shared by training and inference to prevent train/serve skew.",
  },
  {
    icon: GitCompareArrows,
    title: "Champion-Challenger deployment",
    body: "The champion model serves the majority of production traffic while a challenger model scores a smaller slice in parallel. Accuracy and latency are compared continuously before any promotion decision.",
  },
  {
    icon: Container,
    title: "FastAPI + Docker",
    body: "The service is a FastAPI application wrapped in a slim Docker image, exposing typed, validated endpoints for health, metrics, and predictions behind API-key authentication.",
  },
  {
    icon: LineChart,
    title: "Prometheus monitoring",
    body: "Request counts, latency histograms, and resource usage are instrumented and exposed for scraping, giving full visibility into how the model behaves under real traffic.",
  },
  {
    icon: GitBranch,
    title: "GitHub Actions CI/CD",
    body: "Every push runs the test suite and linting before building a container image, so only verified changes reach the deployment pipeline.",
  },
  {
    icon: Cloud,
    title: "Render deployment",
    body: "The container is deployed to Render with automatic health checks and zero-downtime rollouts, keeping the service available during every release.",
  },
];

export function AboutPage() {
  return (
    <section className="container py-16">
      <Reveal className="mx-auto mb-12 max-w-xl text-center">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          How the platform is built
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          A look under the hull — the machine learning pipeline, deployment architecture, and
          monitoring stack that keep predictions fast and reliable.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mb-10">
        <ArchitectureDiagram />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {SECTIONS.map((section, i) => (
          <Reveal key={section.title} delay={Math.min(i * 0.05, 0.25)}>
            <GlassCard className="h-full">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-signal-400/10 text-signal-400">
                <section.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-slate-100">{section.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{section.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
