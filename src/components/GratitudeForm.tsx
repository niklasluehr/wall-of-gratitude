"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addGratitudeEntry } from "@/lib/gratitude-service";
import { useRouter } from "next/navigation";

export function GratitudeForm() {
  const [entries, setEntries] = useState<string[]>(["", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    entries.forEach((entry) => {
      if (entry.trim()) {
        addGratitudeEntry(entry);
      }
    });

    setEntries(["", "", ""]);
    setIsSubmitting(false);
    router.push("/wall");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <p className="text-center mb-4">What are you grateful for today?</p>

      {entries.map((entry, index) => (
        <Input
          key={index}
          value={entry}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`I am grateful for...`}
          className="focus:border-none"
        />
      ))}

      <Button
        type="submit"
        className="w-full mt-6"
        disabled={isSubmitting || !entries.every((e) => e.trim())}
      >
        Save
      </Button>
    </form>
  );
}
