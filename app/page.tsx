"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ErrorAnalysis } from "@/types/error";

function formatContent(content: unknown): string {
  if (content === undefined || content === null) {
    return "No information available.";
  }

  if (typeof content === "string") {
    return content.trim() || "No information available.";
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => `- ${String(item)}`)
      .join("\n");
  }

  if (typeof content === "object") {
    return JSON.stringify(content, null, 2);
  }

  return String(content);
}

export default function Home() {
  const [errorLog, setErrorLog] = useState("");
  const [analysis, setAnalysis] = useState<ErrorAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeError = async () => {
    if (!errorLog.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: errorLog,
        }),
      });

      const data = await response.json();
      setAnalysis(data);

    } catch (error) {
      console.error("Frontend Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">
            ErrorDebugger AI
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl leading-7">
            AI-powered debugging assistant for backend logs,
            API failures,
            authentication issues,
            and cloud errors.
          </p>
        </div>

        {/* Input Section */}
        <Card className="border border-zinc-800 bg-zinc-950 shadow-2xl">
          <CardContent className="p-0">

            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />

              <span className="ml-3 text-sm text-zinc-500">
                error-log.txt
              </span>
            </div>

            {/* Textarea */}
            <textarea
              placeholder="Paste your error logs, stack traces, or API failures here..."
              value={errorLog}
              onChange={(e) => setErrorLog(e.target.value)}
              className="
                w-full
                min-h-[300px]
                resize-none
                bg-black
                text-zinc-100
                placeholder:text-zinc-500
                p-6
                text-sm
                leading-7
                outline-none
                font-mono
              "
            />

            {/* Button */}
            <div className="border-t border-zinc-800 p-4">
              <Button
                onClick={analyzeError}
                disabled={loading}
                className="w-full h-11 text-base font-medium cursor-pointer"
              >
                {loading ? "Analyzing Error..." : "Analyze Error"}
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* Analysis Output */}
        {analysis && (
          <Card className="bg-zinc-950 border border-zinc-800 shadow-2xl">
            <CardContent className="p-8 space-y-8">

              {/* Header */}
              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">
                    Category
                  </p>

                  <h2 className="text-3xl font-semibold text-white">
                    {analysis.category || "Unknown"}
                  </h2>
                </div>

                <Badge
                  variant="destructive"
                  className="text-sm px-4 py-1"
                >
                  {analysis.severity || "Unknown"}
                </Badge>
              </div>

              {/* Root Cause */}
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm uppercase tracking-wide text-zinc-500 mb-3">
                  Root Cause
                </p>

                <div className="text-zinc-100 space-y-2">
                  <ReactMarkdown
                    components={{
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-1" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-zinc-100" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-zinc-100" {...props} />
                      ),
                    }}
                  >
                    {formatContent(analysis.rootCause)}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Explanation */}
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm uppercase tracking-wide text-zinc-500 mb-3">
                  Explanation
                </p>

                <div className="text-zinc-100 space-y-2">
                  <ReactMarkdown
                    components={{
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-1" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-zinc-100" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-zinc-100" {...props} />
                      ),
                    }}
                  >
                    {formatContent(analysis.explanation)}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Fix Suggestion */}
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm uppercase tracking-wide text-zinc-500 mb-3">
                  Fix Suggestion
                </p>

                <div className="text-zinc-100 space-y-2">
                  <ReactMarkdown
                    components={{
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-1" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-zinc-100" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-zinc-100" {...props} />
                      ),
                    }}
                  >
                    {formatContent(analysis.fixSuggestion)}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Prevention */}
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm uppercase tracking-wide text-zinc-500 mb-3">
                  Prevention
                </p>

                <div className="text-zinc-100 space-y-2">
                  <ReactMarkdown
                    components={{
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-1" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-zinc-100" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-zinc-100" {...props} />
                      ),
                    }}
                  >
                    {formatContent(analysis.prevention)}
                  </ReactMarkdown>
                </div>
              </div>

            </CardContent>
          </Card>
        )}

      </div>
    </main>
  );
}