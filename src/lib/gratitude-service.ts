import { GratitudeEntry, GratitudeCount } from "./types";
import { stemmer } from "stemmer";

// Use different storage keys for development and production
const STORAGE_KEY =
  process.env.NODE_ENV === "production"
    ? "gratitude-entries"
    : "gratitude-entries-dev";

const STOP_WORDS = new Set([
  // Articles
  "a",
  "an",
  "the",
  // Prepositions
  "with",
  "for",
  "in",
  "on",
  "at",
  "to",
  "of",
  "by",
  "about",
  "from",
  "up",
  "out",
  "over",
  "after",
  "before",
  "between",
  "through",
  "under",
  "without",
  "around",
  "among",
  "throughout",
  "within",
  // Conjunctions
  "and",
  "or",
  "but",
  "nor",
  "so",
  "yet",
  "for",
  "after",
  "although",
  "as",
  "because",
  "before",
  "if",
  "since",
  "than",
  "though",
  "unless",
  "until",
  "when",
  "where",
  "while",
  // Pronouns
  "i",
  "me",
  "my",
  "mine",
  "myself",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "we",
  "us",
  "our",
  "ours",
  "ourselves",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  // Common verbs
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "shall",
  "should",
  "may",
  "might",
  "must",
  "can",
  "could",
  // Other common words
  "this",
  "that",
  "these",
  "those",
  "there",
  "here",
  "what",
  "which",
  "who",
  "whom",
  "whose",
  "where",
  "when",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
]);

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
  const originalWords: Record<string, string> = {};

  // Count occurrences of each word
  entries.forEach((entry) => {
    const words = entry.text.toLowerCase().split(/\s+/);
    words.forEach((word) => {
      // Skip empty strings and stop words
      if (word.length > 0 && !STOP_WORDS.has(word)) {
        // Remove apostrophes and anything after them
        const cleanWord = word.replace(/'[a-z]*$/, "");

        // Get the stem of the word
        const stem = stemmer(cleanWord);

        // Keep track of the original word for display
        if (!originalWords[stem] || word.length < originalWords[stem].length) {
          originalWords[stem] = word;
        }

        countMap[stem] = (countMap[stem] || 0) + 1;
      }
    });
  });

  // Convert to array for rendering, using the shortest original word
  return Object.keys(countMap)
    .map((stem) => ({
      text: originalWords[stem],
      count: countMap[stem],
    }))
    .sort((a, b) => b.count - a.count);
}

export function exportGratitudeEntries(): string {
  const entries = getGratitudeEntries();
  return JSON.stringify(entries, null, 2);
}

export function importGratitudeEntries(jsonString: string): void {
  try {
    const entries = JSON.parse(jsonString);
    if (Array.isArray(entries)) {
      saveGratitudeEntries(entries);
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    throw new Error("Failed to import data: Invalid JSON format");
  }
}
