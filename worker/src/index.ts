import { SYSTEM_PROMPT } from "./knowledge";

export interface Env {
  RATE_LIMIT: KVNamespace;
  ANTHROPIC_API_KEY: string;
  ANTHROPIC_MODEL: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMIT_PER_HOUR: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGES = 6;
const MAX_MESSAGE_LENGTH = 500;
const MAX_TOKENS = 400;

function corsHeaders(origin: string | null, allowedOrigins: string[]): HeadersInit {
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

function validateMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const trimmed = input.slice(-MAX_MESSAGES);
  const messages: ChatMessage[] = [];
  for (const entry of trimmed) {
    if (
      !entry ||
      typeof entry !== "object" ||
      (entry as { role?: unknown }).role !== "user" &&
      (entry as { role?: unknown }).role !== "assistant"
    ) {
      return null;
    }
    const content = (entry as { content?: unknown }).content;
    if (typeof content !== "string" || content.length === 0 || content.length > MAX_MESSAGE_LENGTH) {
      return null;
    }
    messages.push({ role: (entry as { role: "user" | "assistant" }).role, content });
  }
  // Must end with a user turn — that's what we're answering.
  if (messages[messages.length - 1].role !== "user") return null;
  return messages;
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  const limit = parseInt(env.RATE_LIMIT_PER_HOUR, 10) || 8;
  const hourBucket = Math.floor(Date.now() / 3_600_000);
  const key = `rl:${ip}:${hourBucket}`;
  const current = parseInt((await env.RATE_LIMIT.get(key)) ?? "0", 10);
  if (current >= limit) return false;
  await env.RATE_LIMIT.put(key, String(current + 1), { expirationTtl: 3600 });
  return true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    const headers = corsHeaders(origin, allowedOrigins);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname !== "/chat" || request.method !== "POST") {
      return json({ error: "Not found" }, 404, headers);
    }

    if (origin && !allowedOrigins.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, headers);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const withinLimit = await checkRateLimit(env, ip);
    if (!withinLimit) {
      return json({ error: "Too many requests — try again later." }, 429, headers);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, headers);
    }

    const messages = validateMessages((body as { messages?: unknown })?.messages);
    if (!messages) {
      return json({ error: "Invalid messages payload" }, 400, headers);
    }

    let anthropicRes: Response;
    try {
      anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: env.ANTHROPIC_MODEL || "claude-haiku-4-5",
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });
    } catch {
      return json({ error: "Failed to reach the model" }, 502, headers);
    }

    if (!anthropicRes.ok) {
      return json({ error: "The model request failed" }, 502, headers);
    }

    const data = (await anthropicRes.json()) as {
      content?: { type: string; text?: string }[];
    };
    const reply = data.content?.find((block) => block.type === "text")?.text?.trim();
    if (!reply) {
      return json({ error: "Empty response from the model" }, 502, headers);
    }

    return json({ reply }, 200, headers);
  },
};
