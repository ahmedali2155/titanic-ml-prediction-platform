import { motion } from "framer-motion";
import { SonarMark } from "./SonarMark";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-abyss-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SonarMark className="h-14 w-14 scale-[1.6]" />
      <div className="flex flex-col items-center gap-1.5">
        <p className="label-mono text-slate-500">CALIBRATING SONAR ARRAY</p>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-abyss-700">
          <motion.div
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-signal-400 to-current-400"
            animate={{ x: ["-100%", "220%"] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
