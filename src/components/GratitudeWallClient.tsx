"use client";

import dynamic from "next/dynamic";

const GratitudeWall = dynamic(
  () => import("./GratitudeWall").then((mod) => mod.GratitudeWall),
  {
    ssr: false,
  }
);

export function GratitudeWallClient() {
  return <GratitudeWall />;
}
