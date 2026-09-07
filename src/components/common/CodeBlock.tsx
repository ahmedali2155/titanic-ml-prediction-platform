import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-abyss-950/80">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700/60 bg-abyss-800/80 text-slate-400 transition-colors hover:text-signal-400"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-online" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className="overflow-x-auto p-4 pr-12 font-mono text-[12.5px] leading-relaxed text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
