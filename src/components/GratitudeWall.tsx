"use client";

import { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import { getGratitudeCounts } from "@/lib/gratitude-service";

interface WordCloudData {
  text: string;
  value: number;
}

export function GratitudeWall() {
  const [words, setWords] = useState<WordCloudData[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setDimensions({
      width: isMobile
        ? window.innerWidth - 32
        : Math.min(window.innerWidth - 64, 1200),
      height: Math.floor(window.innerHeight * 0.8),
    });
  }, []);

  useEffect(() => {
    const counts = getGratitudeCounts();
    const wordData = counts.map((item) => ({
      text: item.text,
      value: item.count,
    }));
    setWords(wordData);
  }, []);

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground text-sm">
          Add your first gratitude entry
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div style={{ width: dimensions.width }}>
        <WordCloud
          data={words}
          width={dimensions.width}
          height={dimensions.height}
          font="Arial"
          fontSize={(word) => word.value * 10}
          rotate={0}
          padding={3}
          fill="#475569"
          spiral="rectangular"
          random={Math.random}
        />
      </div>
    </div>
  );
}
