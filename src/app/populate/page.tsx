"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { addGratitudeEntry } from "@/lib/gratitude-service";

const gratitudeEntries = [
  // High frequency items (added multiple times)
  ...Array(10).fill("family"),
  ...Array(8).fill("health"),
  ...Array(7).fill("friends"),
  ...Array(6).fill("sunshine"),

  // Medium frequency items
  ...Array(4).fill("coffee"),
  ...Array(4).fill("music"),
  ...Array(3).fill("books"),
  ...Array(3).fill("nature"),
  ...Array(3).fill("peace"),

  // Lower frequency items (unique experiences)
  "morning walk",
  "good food",
  "warm bed",
  "learning",
  "creativity",
  "laughter",
  "quiet moments",
  "fresh air",
  "kindness",
  "technology",
  "clean water",
  "home",
  "pets",
  "art",
  "sleep",
  "reading",
  "exercise",
  "memories",
  "opportunities",
  "comfort",
];

export default function PopulatePage() {
  const router = useRouter();

  useEffect(() => {
    gratitudeEntries.forEach((entry) => {
      addGratitudeEntry(entry);
    });

    // Redirect to wall page after populating
    router.push("/wall");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <p className="text-muted-foreground">Populating gratitude entries...</p>
    </div>
  );
}
