import { GratitudeEntry, GratitudeCount } from "./types";

// Use different storage keys for development and production
const STORAGE_KEY =
  process.env.NODE_ENV === "production"
    ? "gratitude-entries"
    : "gratitude-entries-dev";

export function saveGratitudeEntries(entries: GratitudeEntry[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
}

export function getGratitudeEntries(): GratitudeEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const entriesJson = localStorage.getItem(STORAGE_KEY);
  return entriesJson ? JSON.parse(entriesJson) : [];
}

export function addGratitudeEntry(text: string): void {
  const entries = getGratitudeEntries();
  const newEntry: GratitudeEntry = {
    id: Date.now().toString(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };

  saveGratitudeEntries([...entries, newEntry]);
}

export function getGratitudeCounts(): GratitudeCount[] {
  const entries = getGratitudeEntries();
  const countMap: Record<string, number> = {};

  // Count occurrences of each gratitude text
  entries.forEach((entry) => {
    const text = entry.text.toLowerCase();
    countMap[text] = (countMap[text] || 0) + 1;
  });

  // Convert to array for rendering
  return Object.keys(countMap)
    .map((text) => ({
      text,
      count: countMap[text],
    }))
    .sort((a, b) => b.count - a.count);
}

export function getWordCounts(): GratitudeCount[] {
  const entries = getGratitudeEntries();
  const countMap: Record<string, number> = {};

  // Count occurrences of each word
  entries.forEach((entry) => {
    const words = entry.text.toLowerCase().split(/\s+/);
    words.forEach((word) => {
      if (word.length > 0) {
        // Skip empty strings
        countMap[word] = (countMap[word] || 0) + 1;
      }
    });
  });

  // Convert to array for rendering
  return Object.keys(countMap)
    .map((text) => ({
      text,
      count: countMap[text],
    }))
    .sort((a, b) => b.count - a.count);
}
