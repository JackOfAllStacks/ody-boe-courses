"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";

type PrimaryFocus = "Learning" | "Reviewing";
type CourseLength = "Short" | "Medium" | "Long";
type Complexity = "Beginner" | "Intermediate" | "Advanced";

export type PromptConfig = {
  primaryFocus: PrimaryFocus;
  length: CourseLength;
  complexity: Complexity;
};

export type AttachmentMeta = {
  id: string;
  name: string;
  size: number;
  extension: "pdf" | "docx" | "md";
};

export type PromptSubmitPayload = {
  prompt: string;
  attachments: AttachmentMeta[];
  config: PromptConfig;
};

type PromptComposerProps = {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: (payload: PromptSubmitPayload) => void;
};

const MAX_ATTACHMENTS = 3;
const ACCEPTED_EXTENSIONS = new Set(["pdf", "docx", "md"]);
const DEFAULT_CONFIG: PromptConfig = {
  primaryFocus: "Learning",
  length: "Short",
  complexity: "Beginner",
};

const getFileExtension = (fileName: string): string => {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
};

const getAttachmentId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const PromptComposer = ({ prompt, onPromptChange, onSubmit }: PromptComposerProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);
  const [statusText, setStatusText] = useState("");
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [config, setConfig] = useState<PromptConfig>(DEFAULT_CONFIG);

  const canAddMore = attachments.length < MAX_ATTACHMENTS;
  const attachmentSummary = useMemo(
    () => `${attachments.length}/${MAX_ATTACHMENTS} attached`,
    [attachments.length]
  );
  const isCustomConfig =
    config.primaryFocus !== DEFAULT_CONFIG.primaryFocus ||
    config.length !== DEFAULT_CONFIG.length ||
    config.complexity !== DEFAULT_CONFIG.complexity;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isConfigOpen) {
      return;
    }
    const onDocumentMouseDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsConfigOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, [isConfigOpen]);

  useEffect(() => {
    if (!isConfigOpen) {
      return;
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsConfigOpen(false);
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isConfigOpen]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    []
  );

  const openConfigMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsConfigOpen(true);
  };

  const scheduleCloseConfigMenu = () => {
    if (!isFinePointer) {
      return;
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsConfigOpen(false);
      closeTimerRef.current = null;
    }, 120);
  };

  const clearStatus = () => {
    if (statusText) {
      setStatusText("");
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files;
    if (!list?.length) {
      return;
    }

    clearStatus();
    const incomingFiles = Array.from(list);
    const existingKeys = new Set(attachments.map((item) => `${item.name}:${item.size}`));
    const nextAttachments = [...attachments];
    let hasUnsupported = false;
    let skippedForLimit = false;

    for (const file of incomingFiles) {
      const extension = getFileExtension(file.name);
      if (!ACCEPTED_EXTENSIONS.has(extension)) {
        hasUnsupported = true;
        continue;
      }
      if (nextAttachments.length >= MAX_ATTACHMENTS) {
        skippedForLimit = true;
        continue;
      }
      const coarseKey = `${file.name}:${file.size}`;
      if (existingKeys.has(coarseKey)) {
        continue;
      }
      existingKeys.add(coarseKey);
      nextAttachments.push({
        id: getAttachmentId(),
        name: file.name,
        size: file.size,
        extension: extension as AttachmentMeta["extension"],
      });
    }

    setAttachments(nextAttachments);
    if (hasUnsupported) {
      setStatusText("Only PDF, DOCX, and Markdown files are supported.");
    } else if (skippedForLimit) {
      setStatusText("You can attach up to 3 files per course prompt.");
    }
    event.target.value = "";
  };

  const handleAttachmentRemove = (id: string) => {
    setAttachments((current) => current.filter((item) => item.id !== id));
    clearStatus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      prompt,
      attachments,
      config,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div ref={containerRef} className="rounded-[24px] border border-odyssey-gray-light bg-white px-4 py-3">
        <input
          value={prompt}
          onChange={(event) => {
            clearStatus();
            onPromptChange(event.target.value);
          }}
          placeholder="I want to learn about..."
          className="w-full bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-odyssey-gray/60"
        />

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-9 min-w-9 items-center justify-center rounded-full border border-odyssey-gray-light text-lg text-foreground transition hover:border-odyssey-orange disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canAddMore}
            aria-label="Add files"
          >
            +
          </button>
          <span className="text-xs uppercase tracking-[0.2em] text-odyssey-gray">{attachmentSummary}</span>
          <div className="ml-auto flex items-center gap-2">
            {isCustomConfig ? (
              <button
                type="button"
                onClick={() => setConfig(DEFAULT_CONFIG)}
                className="inline-flex h-9 items-center gap-1 rounded-pill px-3 text-sm text-[#2c75c8] transition hover:bg-[#eef5ff]"
                aria-label="Reset custom settings"
              >
                <span className="text-xs">x</span>
                <span>Custom</span>
              </button>
            ) : null}
            <div
              onMouseEnter={openConfigMenu}
              onMouseLeave={scheduleCloseConfigMenu}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  if (isFinePointer) {
                    setIsConfigOpen(true);
                    return;
                  }
                  setIsConfigOpen((current) => !current);
                }}
                className="inline-flex h-9 items-center gap-2 rounded-pill border border-odyssey-gray-light px-4 text-sm text-foreground transition hover:border-odyssey-orange"
                aria-expanded={isConfigOpen}
                aria-controls="prompt-config-menu"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 4H14M2 8H14M2 12H14M5 4C5 4.828 4.328 5.5 3.5 5.5C2.672 5.5 2 4.828 2 4C2 3.172 2.672 2.5 3.5 2.5C4.328 2.5 5 3.172 5 4ZM11.5 8C11.5 8.828 10.828 9.5 10 9.5C9.172 9.5 8.5 8.828 8.5 8C8.5 7.172 9.172 6.5 10 6.5C10.828 6.5 11.5 7.172 11.5 8ZM8 12C8 12.828 7.328 13.5 6.5 13.5C5.672 13.5 5 12.828 5 12C5 11.172 5.672 10.5 6.5 10.5C7.328 10.5 8 11.172 8 12Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Configure
              </button>

              {isConfigOpen ? (
                <div
                  id="prompt-config-menu"
                  onMouseEnter={openConfigMenu}
                  onMouseLeave={scheduleCloseConfigMenu}
                  className="absolute right-0 top-12 z-20 w-[min(640px,92vw)] rounded-[18px] border border-odyssey-gray-light bg-[#f4f4f4] p-4 shadow-[0_16px_35px_rgba(17,17,17,0.12)]"
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="mb-2 text-sm text-odyssey-gray">Primary Focus</p>
                      <div className="space-y-1">
                        {(["Learning", "Reviewing"] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setConfig((current) => ({
                                ...current,
                                primaryFocus: option,
                              }))
                            }
                            className={`w-full rounded-xl px-3 py-2 text-left text-base transition ${
                              config.primaryFocus === option ? "bg-[#e7e5e3]" : "hover:bg-[#e7e5e3]/70"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-odyssey-gray">Length</p>
                      <div className="space-y-1">
                        {(["Short", "Medium", "Long"] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setConfig((current) => ({
                                ...current,
                                length: option,
                              }))
                            }
                            className={`w-full rounded-xl px-3 py-2 text-left text-base transition ${
                              config.length === option ? "bg-[#e7e5e3]" : "hover:bg-[#e7e5e3]/70"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-odyssey-gray">Complexity</p>
                      <div className="space-y-1">
                        {(["Beginner", "Intermediate", "Advanced"] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setConfig((current) => ({
                                ...current,
                                complexity: option,
                              }))
                            }
                            className={`w-full rounded-xl px-3 py-2 text-left text-base transition ${
                              config.complexity === option ? "bg-[#e7e5e3]" : "hover:bg-[#e7e5e3]/70"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs uppercase tracking-[0.2em] text-white transition hover:bg-black"
              aria-label="Generate course"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M8 13V3M8 3L4.5 6.5M8 3L11.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {attachments.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="inline-flex items-center gap-2 rounded-pill border border-odyssey-gray-light bg-[#f8f7f5] px-3 py-1.5 text-xs"
              >
                <span className="max-w-[180px] truncate">{attachment.name}</span>
                <span className="rounded-md bg-white px-1.5 py-0.5 uppercase text-[10px] tracking-[0.2em] text-odyssey-gray">
                  {attachment.extension}
                </span>
                <button
                  type="button"
                  onClick={() => handleAttachmentRemove(attachment.id)}
                  className="text-odyssey-gray transition hover:text-foreground"
                  aria-label={`Remove ${attachment.name}`}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {statusText ? <p className="mt-2 text-xs text-odyssey-orange">{statusText}</p> : null}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.docx,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown,text/plain"
          onChange={handleFileSelect}
        />
      </div>
    </form>
  );
};
