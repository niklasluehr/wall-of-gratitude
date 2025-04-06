"use client";

import { useEffect, useState, useMemo } from "react";
import WordCloud from "react-d3-cloud";
import { getGratitudeCounts, getWordCounts } from "@/lib/gratitude-service";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface WordCloudData {
  text: string;
  value: number;
}

type ViewMode = "entries" | "words";

export function GratitudeWall() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [viewMode, setViewMode] = useState<ViewMode>("entries");

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setDimensions({
      width: isMobile
        ? window.innerWidth - 32
        : Math.min(window.innerWidth - 64, 1200),
      height: Math.floor(window.innerHeight * 0.8),
    });
  }, []);

  const words = useMemo(() => {
    const counts =
      viewMode === "entries" ? getGratitudeCounts() : getWordCounts();
    return counts.map((item) => ({
      text: item.text,
      value: item.count,
    }));
  }, [viewMode]);

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground text-sm">
          Add your first gratitude entry
        </p>
      </div>
    );
  }

  const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

  return (
    <>
      <div className="flex justify-center items-center h-full w-full">
        <div style={{ width: dimensions.width, height: dimensions.height }}>
          <WordCloud
            data={words}
            width={dimensions.width}
            height={dimensions.height}
            font="Impact"
            fontSize={(word) => {
              const maxValue = Math.max(...words.map((w) => w.value));
              const scale = 30 / Math.log2(maxValue + 1);
              // Square the logarithmic result to create bigger differences
              return Math.max(
                12,
                Math.pow(Math.log2(word.value + 1), 2) * scale
              );
            }}
            padding={0.5}
            rotate={0}
            fill={(d: WordCloudData, i: string) =>
              schemeCategory10ScaleOrdinal(i)
            }
            spiral="archimedean"
          />
        </div>
      </div>
      <BottomBar viewMode={viewMode} setViewMode={setViewMode} />
    </>
  );
}

function BottomBar({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 w-full justify-center">
        <div className="flex items-center justify-center bg-muted rounded-full p-1">
          <button
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              viewMode === "entries"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("entries")}
          >
            entries
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              viewMode === "words"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("words")}
          >
            words
          </button>
        </div>
        <Link href="/">
          <Button size="icon" className="rounded-full h-8 w-8 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
