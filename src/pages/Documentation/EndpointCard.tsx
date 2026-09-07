import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { CodeBlock } from "@/components/common/CodeBlock";
import { cn } from "@/utils/cn";

interface EndpointCardProps {
  method: "GET" | "POST";
  path: string;
  description: string;
  curl: string;
  requestBody?: string;
  responseBody?: string;
}

export function EndpointCard({
  method,
  path,
  description,
  curl,
  requestBody,
  responseBody,
}: EndpointCardProps) {
  return (
    <GlassCard className="overflow-hidden p-0">

      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/40 px-6 py-5">
        <div className="flex flex-wrap items-center gap-3">

          <span
            className={cn(
              "rounded-md px-3 py-1 text-xs font-bold tracking-wide",
              method === "GET"
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-blue-500/15 text-blue-400"
            )}
          >
            {method}
          </span>

          <code className="font-mono text-base text-white">
            {path}
          </code>

        </div>

        <p className="mt-4 leading-relaxed text-slate-400">
          {description}
        </p>
      </div>

      <div className="space-y-8 p-6">

        {/* Request */}
        {requestBody && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-signal-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Request Body
              </h3>
            </div>

            <CodeBlock code={requestBody} />
          </section>
        )}

        {/* Response */}
        {responseBody && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Sample Response
              </h3>
            </div>

            <CodeBlock code={responseBody} />
          </section>
        )}

        {/* cURL */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              cURL Example
            </h3>
          </div>

          <CodeBlock code={curl} />
        </section>

      </div>

    </GlassCard>
  );
}