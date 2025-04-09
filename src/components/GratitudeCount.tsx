"use client";

import { useState, useEffect } from "react";
import { getGratitudeEntries } from "@/lib/gratitude-service";

export default function GratitudeCount() {
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const allEntries = getGratitudeEntries();
    setTotalEntries(allEntries.length);
  }, []);

  return (
    <p className="text-center text-sm text-muted-foreground">
      {totalEntries} entries
    </p>
  );
}
