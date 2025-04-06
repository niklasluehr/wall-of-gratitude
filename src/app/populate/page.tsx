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
  ["my family", 15],
  ["good health", 12],
  ["close friends", 10],
  ["good sleep", 8],

  // Regular (2-3 times per week)
  ["coffee", 12],
  ["sunshine", 10],
  ["home", 10],
  ["food", 9],
  ["music", 8],
  ["peace", 8],
  ["morning coffee", 6],
  ["warm sunshine", 5],
  ["my home", 5],
  ["delicious food", 4],
  ["favorite music", 4],
  ["inner peace", 4],

  // Occasional (weekly)
  ["nature", 6],
  ["books", 5],
  ["exercise", 5],
  ["pets", 5],
  ["creativity", 4],
  ["learning", 4],
  ["beautiful nature", 3],
  ["good books", 3],
  ["daily exercise", 3],
  ["my pets", 3],
  ["creative ideas", 2],
  ["new learning", 2],

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
  ["random acts of kindness", 1],
  ["hearty laughter", 1],
  ["modern technology", 1],
  ["beautiful art", 1],
  ["happy memories", 1],
  ["new opportunities", 1],
  ["cozy warm bed", 1],
  ["peaceful morning walk", 1],
  ["fresh clean water", 1],
  ["home comfort", 1],
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
