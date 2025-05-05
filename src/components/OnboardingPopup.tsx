"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function OnboardingPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenPopup) {
      setIsOpen(true);
      localStorage.setItem("hasSeenOnboarding", "true");
    }
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2 pb-2">
          <DialogTitle className="text-2xl sm:text-xl font-bold text-center">
            Welcome to Your Gratitude Journey
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Start your day with gratitude and watch it grow into something
            beautiful
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                1
              </span>
              <span>
                Make this website your browser start screen to build a daily
                gratitude practice.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                2
              </span>
              <span>
                Every time you open your browser, enter three things you are
                grateful for.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                3
              </span>
              <span>
                All these entries will accumulate over time and form a beautiful
                wall of gratitude.
              </span>
            </li>
          </ul>
        </div>
        <div className="flex justify-center pt-4">
          <Button onClick={() => setIsOpen(false)} className="px-8">
            Let{"'"}s Begin
          </Button>
        </div>
        <DialogDescription className="pt-2 text-xs text-muted-foreground text-center">
          All data is only stored in your browser for privacy.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
