export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class ChatError extends Error {}

/**
 * Calls the "Ask Arnav" Cloudflare Worker with the running conversation and
 * returns the assistant's reply. The worker URL is baked in at build time via
 * NEXT_PUBLIC_CHAT_API_URL (works with `output: "export"` since it's a
 * client-side env var resolved at build, not at request time).
 */

export async function askArnav(messages: ChatMessage[]): Promise<string> {
  const endpoint = process.env.NEXT_PUBLIC_CHAT_API_URL;
  if (!endpoint) {
    throw new ChatError("Chat isn't configured yet.");
  }

  let res: Response;
  try {
    res = await fetch(`${endpoint.replace(/\/$/, "")}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  } catch {
    throw new ChatError("Couldn't reach the chat — check your connection and try again.");
  }

  if (!res.ok) {
    if (res.status === 429) {
      throw new ChatError("Too many questions for now — try again in a bit.");
    }
    throw new ChatError("Something went wrong. Try again.");
  }

  const data = (await res.json()) as { reply?: string };
  if (!data.reply) {
    throw new ChatError("Something went wrong. Try again.");
  }
  return data.reply;
}
