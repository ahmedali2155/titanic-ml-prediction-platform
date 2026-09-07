import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { Reveal } from "@/components/animations/Reveal";
import { usePrediction } from "@/hooks/usePrediction";
import { PassengerForm } from "./PassengerForm";
import { ResultCard } from "./ResultCard";
import type { PassengerFormValues } from "@/utils/schemas";

export function PredictionPage() {
  const { predict, result, isSubmitting } = usePrediction();

  async function handleSubmit(values: PassengerFormValues, useDemo: boolean) {
    try {
      await predict(values, useDemo);
      toast.success(useDemo ? "Demo prediction complete" : "Prediction complete");
    } catch (err) {
      const message = (err as { message?: string })?.message ?? "Prediction failed";
      toast.error(message);
    }
  }

  return (
    <section className="container py-16">
      <Reveal className="mx-auto mb-10 max-w-lg text-center">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-signal-400/10 text-signal-400">
          <Compass className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Run a live prediction</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Describe a passenger and the champion model will score their survival probability in
          real time. Use the demo endpoint to try it without a production API key.
        </p>
      </Reveal>

      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Reveal delay={0.05}>
          <GlassCard>
            <PassengerForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </GlassCard>
        </Reveal>

        <AnimatePresence mode="wait">
          {result && <ResultCard key={result.predictionId} result={result} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
