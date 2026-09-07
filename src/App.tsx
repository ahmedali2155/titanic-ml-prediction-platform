import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { BackToTop } from "@/components/common/BackToTop";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { PageTransition } from "@/components/animations/PageTransition";

import { HomePage } from "@/pages/Home/HomePage";
import { PredictionPage } from "@/pages/Prediction/PredictionPage";
import { DashboardPage } from "@/pages/Dashboard/DashboardPage";
import { AboutPage } from "@/pages/About/AboutPage";
import { DocumentationPage } from "@/pages/Documentation/DocumentationPage";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/prediction" element={<PageTransition><PredictionPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/docs" element={<PageTransition><DocumentationPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{booting && <LoadingScreen />}</AnimatePresence>

      <AmbientBackground />
      <ScrollProgressBar />

      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>

      <BackToTop />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4500,
          style: {
            background: "#0c1220",
            color: "#e2e8f0",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            fontSize: "13px",
          },
          success: { iconTheme: { primary: "#38bdf8", secondary: "#0c1220" } },
          error: { iconTheme: { primary: "#fb7185", secondary: "#0c1220" } },
        }}
      />
    </>
  );
}
