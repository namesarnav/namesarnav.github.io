import fs from "node:fs";
import path from "node:path";

const AUDIO_EXTENSIONS = [".mp3", ".ogg", ".wav", ".m4a"];

/**
 * Server-only: reads public/vibe/ at build time and returns the audio files
 * found there as public URL paths. Drop tracks in that folder — no code
 * changes needed. Returns an empty list if the folder is missing or empty.
 */
export function getPlaylist(): string[] {
  const dir = path.join(process.cwd(), "public", "vibe");

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => AUDIO_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => `/vibe/${file}`);
}
