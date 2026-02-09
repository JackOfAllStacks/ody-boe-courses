"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PromptComposer, type PromptSubmitPayload } from "@/components/prompt/PromptComposer";

const LandingPromptClient = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const examplePrompts = useMemo(
    () => [
      "AI for education technology: adaptive tutoring and outcomes",
      "Business project development from idea to launch plan",
      "Agentic coding in 2026: workflows, risks, and best practices",
    ],
    []
  );

  const handleSubmit = ({
    prompt: nextPrompt,
    attachments,
    config,
  }: PromptSubmitPayload) => {
    const topic = nextPrompt.trim() || "Multi-modal learning";
    const params = new URLSearchParams({
      topic,
      focus: config.primaryFocus,
      length: config.length,
      complexity: config.complexity,
      files: JSON.stringify(
        attachments.map((attachment) => ({
          name: attachment.name,
          extension: attachment.extension,
          size: attachment.size,
        }))
      ),
    });
    router.push(`/generate?${params.toString()}`);
  };

  return (
    <>
      <div className="mt-8 w-full max-w-3xl">
        <PromptComposer
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {examplePrompts.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPrompt(item)}
            className="rounded-pill border border-odyssey-gray-light bg-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-odyssey-gray transition hover:border-odyssey-orange"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default LandingPromptClient;
