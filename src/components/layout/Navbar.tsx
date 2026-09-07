import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, FileText, Menu, X } from "lucide-react";
import { SonarMark } from "@/components/common/SonarMark";
import { StatusPill } from "@/components/common/StatusPill";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/prediction", label: "Prediction" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/docs", label: "API Docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { status } = useHealthCheck();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-abyss-950/70 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <SonarMark />
          <span className="font-display text-[15px] font-semibold text-slate-100">
            Titanic<span className="text-gradient">ML</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-100",
                  isActive && "text-slate-100"
                )
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-[9px] left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-signal-400 to-current-400"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-slate-100"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <StatusPill status={status} />
          <ThemeToggle />
          <NavLink to="/prediction" className="btn-primary">
            Try Demo
          </NavLink>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 text-slate-300 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-800/60 lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400",
                      isActive && "bg-abyss-800/60 text-slate-100"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <div className="mt-2 flex items-center justify-between px-3">
                <StatusPill status={status} />
                <ThemeToggle />
              </div>
              <NavLink to="/prediction" className="btn-primary mt-2" onClick={() => setOpen(false)}>
                <FileText className="h-4 w-4" /> Try Demo
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
