"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { addGratitudeEntry } from "@/lib/gratitude-service";

// Format: [word, count]
const entries: [string, number][] = [
  // Very frequent (daily gratitudes)
  ["family", 28],
  ["health", 25],
  ["friends", 22],
  ["sleep", 20],

  // Regular (2-3 times per week)
  ["coffee", 12],
  ["sunshine", 10],
  ["home", 10],
  ["food", 9],
  ["music", 8],
  ["peace", 8],

  // Occasional (weekly)
  ["nature", 6],
  ["books", 5],
  ["exercise", 5],
  ["pets", 5],
  ["creativity", 4],
  ["learning", 4],

  // Rare (special moments)
  ["quiet moments", 3],
  ["fresh air", 3],
  ["kindness", 3],
  ["laughter", 3],
  ["technology", 2],
  ["art", 2],
  ["memories", 2],
  ["opportunities", 2],
  ["warm bed", 1],
  ["morning walk", 1],
  ["clean water", 1],
  ["comfort", 1],
];

export default function PopulatePage() {
  const router = useRouter();

  useEffect(() => {
    entries.forEach(([word, count]) => {
      for (let i = 0; i < count; i++) {
        addGratitudeEntry(word);
      }
    });

    router.push("/wall");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <p className="text-muted-foreground">Populating gratitude entries...</p>
    </div>
  );
}
