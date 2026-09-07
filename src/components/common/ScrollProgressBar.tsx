import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgressBar() {
  const progress = useScrollProgress();
  const spring = useSpring(0, { stiffness: 200, damping: 30, mass: 0.3 });

  useEffect(() => {
    spring.set(progress);
  }, [progress, spring]);

  return (
    <motion.div
      style={{ scaleX: spring }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-signal-400 via-current-400 to-signal-500"
      aria-hidden="true"
    />
  );
}
