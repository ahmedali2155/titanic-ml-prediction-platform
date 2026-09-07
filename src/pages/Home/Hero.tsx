import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Anchor } from "lucide-react";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="container relative flex flex-col items-center gap-14 pb-24 pt-20 lg:flex-row lg:items-center lg:gap-10 lg:pb-32 lg:pt-28">
      <div className="max-w-xl text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-abyss-800/50 px-3.5 py-1.5 text-xs text-slate-400"
        >
          <Anchor className="h-3.5 w-3.5 text-signal-400" />
          FastAPI microservice · deployed on Render
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl font-semibold leading-[1.08] text-slate-50 sm:text-5xl lg:text-[3.4rem]"
        >
          Titanic ML Prediction Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-5 max-w-lg text-balance text-base leading-relaxed text-slate-400 lg:mx-0"
        >
          A production-ready machine learning microservice featuring Champion-Challenger
          deployment, live drift detection, and Prometheus monitoring — containerized, tested,
          and shipped through CI/CD.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
        >
          <Link to="/prediction" className="btn-primary w-full sm:w-auto">
            Try Prediction <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://prosensia-ml-api.onrender.com/docs"
            target="_blank"
            rel="noreferrer"
            className="btn-glass w-full sm:w-auto"
          >
            <BookOpen className="h-4 w-4" /> View API
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-800/60 pt-6"
        >
          {[
            ["99.9%", "Uptime target"],
            ["<120ms", "Median latency"],
            ["2", "Models in production"],
          ].map(([value, label]) => (
            <div key={label} className="text-center lg:text-left">
              <p className="font-display text-xl font-semibold text-slate-100">{value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="w-full max-w-md lg:max-w-none lg:flex-1">
        <HeroVisual />
      </div>
    </section>
  );
}
