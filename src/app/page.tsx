"use client";

import { GratitudeForm } from "@/components/GratitudeForm";
import { OnboardingPopup } from "@/components/OnboardingPopup";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <OnboardingPopup />
      <header className="mb-12">
        <h1 className="text-2xl font-bold text-center">Wall of Gratitude</h1>
        <p className="text-center text-sm text-muted-foreground">
          {`${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
        </p>
      </header>
      <GratitudeForm />

      <div className="mt-4">
        <Link href="/wall">
          <Button variant="ghost" size="sm">
            View wall
          </Button>
        </Link>
      </div>
      <footer className="fixed bottom-2 left-0 right-0 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <a
          className="hover:underline"
          target="_blank"
          href="https://niklasluehr.com"
        >
          niklasluehr.com
        </a>
      </footer>
    </div>
  );
}
