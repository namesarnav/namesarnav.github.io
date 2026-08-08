"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { askArnav, ChatError, type ChatMessage } from "@/lib/chat";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SUGGESTIONS = ["What is he working on right now?", "What's his ML stack?", "How do I get in touch?"];

export default function AskArnav() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const open = messages.length > 0;

  const send = async (question: string) => {
    const text = question.trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const reply = await askArnav(next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof ChatError ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="w-full max-w-[720px]">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 rounded-full border border-border bg-bg-alt py-2 pr-2 pl-6 transition-colors focus-within:border-accent"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Arnav"
          maxLength={500}
          className="min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-fg-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Ask"
          className="avp-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fg text-bg disabled:opacity-40"
        >
          {loading ? (
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-current" />
          ) : (
            <span className="text-lg leading-none">↗</span>
          )}
        </button>
      </form>

      {!open && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="avp-skill rounded-full border border-border px-4 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-4 flex flex-col gap-4 rounded-[4px] border border-border bg-bg-alt p-6"
          >
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-fg" : "text-fg-muted"}>
                <div className="mb-1 text-xs font-semibold tracking-[.08em] text-fg-muted uppercase">
                  {m.role === "user" ? "You" : "Ask Arnav"}
                </div>
                <p className="m-0 text-[15px] leading-[1.6]">{m.content}</p>
              </div>
            ))}
            {loading && (
              <div className="text-fg-muted">
                <div className="mb-1 text-xs font-semibold tracking-[.08em] text-fg-muted uppercase">Ask Arnav</div>
                <p className="m-0 text-[15px] leading-[1.6]">Thinking…</p>
              </div>
            )}
            {error && <p className="m-0 text-sm text-accent">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
