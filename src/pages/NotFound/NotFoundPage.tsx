import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LifeBuoy } from "lucide-react";

export function NotFoundPage() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-slate-700/60 bg-abyss-800/60"
      >
        <span className="absolute h-full w-full animate-pulse-ring rounded-full border border-offline/40" />
        <LifeBuoy className="h-10 w-10 text-offline" />
      </motion.div>

      <p className="label-mono text-slate-500">SIGNAL LOST · 404</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-50 sm:text-4xl">
        This page didn't make it to shore
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
        The route you're looking for doesn't exist. It may have moved, or the link might be
        broken.
      </p>

      <Link to="/" className="btn-primary mt-8">
        <Home className="h-4 w-4" /> Back to safety
      </Link>
    </section>
  );
}
