import { GratitudeWall } from "@/components/GratitudeWall";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function WallPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh]">
      <GratitudeWall />

      <div className="fixed bottom-8 w-full max-w-4xl mx-auto">
        <Link href="/" className="flex justify-end sm:justify-center px-8">
          <Button
            size="icon"
            className="rounded-full h-10 sm:h-12 w-10 sm:w-12 shadow-lg"
          >
            <Plus className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
