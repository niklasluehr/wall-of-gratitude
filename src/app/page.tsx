import { GratitudeForm } from "@/components/GratitudeForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <GratitudeForm />

      <div className="mt-4">
        <Link href="/wall">
          <Button variant="ghost" size="sm">
            View wall
          </Button>
        </Link>
      </div>
    </div>
  );
}
