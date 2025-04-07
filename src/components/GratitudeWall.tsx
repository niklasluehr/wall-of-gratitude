"use client";

import { useState, useEffect, useMemo } from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Plus, Download, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  exportGratitudeEntries,
  importGratitudeEntries,
  getGratitudeCounts,
  getWordCounts,
} from "@/lib/gratitude-service";
import { toast } from "sonner";

type ViewMode = "entries" | "words";

interface WordCloudData {
  text: string;
  value: number;
}

export function GratitudeWall() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [viewMode, setViewMode] = useState<ViewMode>("entries");
  const [isLoading, setIsLoading] = useState(true);
  // This is used to trigger a re-render when the data is imported
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setDimensions({
      width: isMobile
        ? window.innerWidth - 32
        : Math.min(window.innerWidth - 64, 1200),
      height: Math.floor(window.innerHeight * 0.8),
    });
    setIsLoading(false);
  }, []);

  const words = useMemo(() => {
    const counts =
      viewMode === "entries" ? getGratitudeCounts() : getWordCounts();
    return counts.map((item) => ({
      text: item.text,
      value: item.count,
    }));
  }, [viewMode, dataVersion]);

  if (!isLoading && words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-muted-foreground text-sm">
          Add your first gratitude entry
        </p>
        <div className="flex items-center gap-2">
          <ImportButton
            onDataImported={() => setDataVersion((prev) => prev + 1)}
          />
          <AddButton variant="outline" />
        </div>
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
      <BottomBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalCount={words.length}
      />
    </>
  );
}

function ExportButton() {
  const handleExport = () => {
    const data = exportGratitudeEntries();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gratitude-entries.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      size="icon"
      className="rounded-full h-7 w-7"
      onClick={handleExport}
      title="Export data"
    >
      <Download />
    </Button>
  );
}

function ImportButton({ onDataImported }: { onDataImported: () => void }) {
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          importGratitudeEntries(content);
          toast.success("Data imported successfully");
          onDataImported();
        } catch (error) {
          toast.error(
            `Failed to import data: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
        id="import-file"
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-8 w-8 shadow-md"
        onClick={() => document.getElementById("import-file")?.click()}
        title="Import data"
      >
        <Upload />
      </Button>
    </>
  );
}

function AddButton({
  variant = "outline",
}: {
  variant?: "outline" | "default";
}) {
  return (
    <Link href="/">
      <Button
        variant={variant}
        size="icon"
        title="Add entries"
        className={`rounded-full ${
          variant === "outline" ? "h-8 w-8 shadow-md" : "h-7 w-7"
        }`}
      >
        <Plus />
      </Button>
    </Link>
  );
}

function BottomBar({
  viewMode,
  setViewMode,
  totalCount,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  totalCount: number;
}) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between max-w-sm mx-auto px-8">
        <span className="text-xs text-muted-foreground w-[4rem]">
          {totalCount} {viewMode}
        </span>

        <div className="flex items-center justify-center bg-muted rounded-full p-1">
          <button
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              viewMode === "entries"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("entries")}
          >
            entries
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              viewMode === "words"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("words")}
          >
            words
          </button>
        </div>

        <div className="flex w-[4rem] justify-between items-center">
          <AddButton variant="default" />
          <ExportButton />
        </div>
      </div>
    </div>
  );
}
