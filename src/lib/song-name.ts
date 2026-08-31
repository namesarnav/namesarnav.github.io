/**
 * Turns an audio file path into something worth showing: "/audio/01_lo-fi
 * beats.mp3" reads as "Lo-Fi Beats". A leading track number is dropped, and any
 * word the author already capitalised is left alone, so "LoFi" survives.
 */
export function songNameFromSrc(src: string): string | undefined {
  const withoutQuery = src.split(/[?#]/)[0];
  const file = withoutQuery.split("/").pop();
  if (!file) return undefined;

  let name: string;
  try {
    name = decodeURIComponent(file);
  } catch {
    name = file;
  }

  name = name
    .replace(/\.[a-z0-9]{1,5}$/i, "")   // extension
    .replace(/^\d+\s*[-_.]\s*/, "")      // leading track number
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!name) return undefined;

  return name
    .split(" ")
    .map((word) => (/[A-Z]/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}
