import { Link } from "react-router-dom";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

export function CTASection() {
  return (
    <section className="container pb-28">
      <Reveal>
        <div className="glass-panel relative overflow-hidden px-8 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-hull-gradient opacity-80" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
              Send a passenger. Get a prediction in milliseconds.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
              Fill out a short form and watch the champion model score survival probability in
              real time, with full latency and confidence detail.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/prediction" className="btn-primary">
                Try Prediction <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="btn-glass">
                <LayoutDashboard className="h-4 w-4" /> View Live Dashboard
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
