import { Github, Linkedin, Globe, FileText } from "lucide-react";
import { SonarMark } from "@/components/common/SonarMark";

const YEAR = new Date().getFullYear();

const LINKS = [
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://example.com", label: "Portfolio", icon: Globe },
  { href: "https://prosensia-ml-api.onrender.com/docs", label: "API Docs", icon: FileText },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-abyss-950/60">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <SonarMark animated={false} />
            <span className="font-display text-sm font-semibold text-slate-100">
              Titanic<span className="text-gradient">ML</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            A production-grade FastAPI machine learning microservice with Champion-Challenger
            deployment, live drift detection, and Prometheus monitoring.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-4">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-signal-400"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800/60 py-6">
        <p className="container text-center text-xs text-slate-600">
          © {YEAR} Titanic ML Prediction Platform. Built as a portfolio demonstration of a
          production ML deployment.
        </p>
      </div>
    </footer>
  );
}
