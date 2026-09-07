import {
  ExternalLink,
  BookMarked,
  Shield,
  Server,
  AlertTriangle,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { GlassCard } from "@/components/cards/GlassCard";
import { CodeBlock } from "@/components/common/CodeBlock";
import { EndpointCard } from "./EndpointCard";

const BASE_URL = "https://prosensia-ml-api.onrender.com";

const SAMPLE_PAYLOAD = `{
  "Pclass": 1,
  "Sex": "female",
  "Age": 29,
  "SibSp": 0,
  "Parch": 0,
  "Fare": 78.5,
  "Embarked": "S"
}`;

const SAMPLE_RESPONSE = `{
  "survived": true,
  "prediction": 1,
  "confidence": 0.87,
  "model": "Champion",
  "prediction_id": "a72c9197-7637-4000-8cf6-29e0250c4d03",
  "latency_ms": 12.3,
  "timestamp": "2026-09-07T11:08:00Z"
}`;

const ERROR_RESPONSE = `{
  "detail": [
    {
      "loc": ["body", "Age"],
      "msg": "Field required",
      "type": "missing"
    }
  ]
}`;

const ENDPOINTS = [
  {
    method: "GET" as const,
    path: "/health-check",
    description:
      "Returns the current health status of the API. Used by the dashboard to monitor service availability.",
    curl: `curl ${BASE_URL}/health-check`,
  },
  {
    method: "GET" as const,
    path: "/metrics",
    description:
      "Returns Prometheus metrics including request counts, latency, CPU, and memory usage.",
    curl: `curl ${BASE_URL}/metrics \\
  -H "x-api-key: YOUR_API_KEY"`,
  },
  {
    method: "GET" as const,
    path: "/metrics/drift",
    description:
      "Returns feature drift statistics comparing live traffic against the training dataset.",
    curl: `curl ${BASE_URL}/metrics/drift \\
  -H "x-api-key: YOUR_API_KEY"`,
  },
  {
    method: "GET" as const,
    path: "/ab/metrics",
    description:
      "Returns Champion/Challenger traffic split and deployment statistics.",
    curl: `curl ${BASE_URL}/ab/metrics \\
  -H "x-api-key: YOUR_API_KEY"`,
  },
  {
    method: "POST" as const,
    path: "/predict",
    description:
      "Runs inference using the production Champion model. Requires authentication.",
    requestBody: SAMPLE_PAYLOAD,
    responseBody: SAMPLE_RESPONSE,
    curl: `curl -X POST ${BASE_URL}/predict \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '${SAMPLE_PAYLOAD.replace(/\n\s*/g, " ")}'`,
  },
  {
    method: "POST" as const,
    path: "/demo/predict",
    description:
      "Runs inference using the public demo endpoint without requiring an API key.",
    requestBody: SAMPLE_PAYLOAD,
    responseBody: SAMPLE_RESPONSE,
    curl: `curl -X POST ${BASE_URL}/demo/predict \\
  -H "Content-Type: application/json" \\
  -d '${SAMPLE_PAYLOAD.replace(/\n\s*/g, " ")}'`,
  },
];

export function DocumentationPage() {
  return (
    <section className="container py-16">

      <Reveal className="mx-auto mb-12 max-w-2xl text-center">

        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-signal-400/10 text-signal-400">
          <BookMarked className="h-5 w-5" />
        </div>

        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          API Reference
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Complete documentation for every endpoint exposed by the Titanic ML
          Prediction API.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">

          <a
            href={`${BASE_URL}/docs`}
            target="_blank"
            rel="noreferrer"
            className="btn-glass inline-flex items-center gap-2"
          >
            Swagger UI
            <ExternalLink className="h-4 w-4" />
          </a>

          <a
            href={`${BASE_URL}/redoc`}
            target="_blank"
            rel="noreferrer"
            className="btn-glass inline-flex items-center gap-2"
          >
            ReDoc
          </a>

          <a
            href={`${BASE_URL}/openapi.json`}
            target="_blank"
            rel="noreferrer"
            className="btn-glass inline-flex items-center gap-2"
          >
            OpenAPI JSON
          </a>

        </div>

      </Reveal>

      <div className="mx-auto flex max-w-3xl flex-col gap-6">

        <GlassCard>

          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-signal-400" />
            <h2 className="text-lg font-semibold text-white">
              Authentication
            </h2>
          </div>

          <p className="mb-4 text-sm text-slate-400">
            Production endpoints require an API key sent in the
            <code className="mx-1 rounded bg-slate-800 px-1 py-0.5">
              x-api-key
            </code>
            request header.
          </p>

          <CodeBlock code={`x-api-key: YOUR_API_KEY`} />

        </GlassCard>

        <GlassCard>

          <div className="mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-signal-400" />
            <h2 className="text-lg font-semibold text-white">
              Base URL
            </h2>
          </div>

          <CodeBlock code={BASE_URL} />

          <p className="mt-4 text-sm text-slate-400">
            Content-Type: application/json
          </p>

        </GlassCard>

        <GlassCard>

          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-signal-400" />
            <h2 className="text-lg font-semibold text-white">
              HTTP Status Codes
            </h2>
          </div>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="font-mono text-green-400">200 OK</span>
              <span className="text-slate-400">Successful request</span>
            </div>

            <div className="flex justify-between">
              <span className="font-mono text-yellow-400">400 Bad Request</span>
              <span className="text-slate-400">Malformed request</span>
            </div>

            <div className="flex justify-between">
              <span className="font-mono text-orange-400">401 Unauthorized</span>
              <span className="text-slate-400">Invalid API key</span>
            </div>

            <div className="flex justify-between">
              <span className="font-mono text-red-400">422 Validation Error</span>
              <span className="text-slate-400">Invalid input data</span>
            </div>

            <div className="flex justify-between">
              <span className="font-mono text-red-500">500 Internal Error</span>
              <span className="text-slate-400">Unexpected server error</span>
            </div>

          </div>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-lg font-semibold text-white">
            Example Validation Error
          </h2>

          <CodeBlock code={ERROR_RESPONSE} />

        </GlassCard>

        {ENDPOINTS.map((endpoint, index) => (
          <Reveal
            key={endpoint.path}
            delay={Math.min(index * 0.05, 0.25)}
          >
            <EndpointCard {...endpoint} />
          </Reveal>
        ))}

        <GlassCard>

          <h2 className="mb-5 text-lg font-semibold text-white">
            Resources
          </h2>

          <div className="flex flex-wrap gap-4">

            <a
              href="https://github.com/ahmedali2155"
              target="_blank"
              rel="noreferrer"
              className="btn-glass inline-flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/ahmedalii-ai/"
              target="_blank"
              rel="noreferrer"
              className="btn-glass inline-flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>

            <a
              href="http://ahmedalii-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="btn-glass inline-flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Portfolio
            </a>

          </div>

        </GlassCard>

      </div>

    </section>
  );
}