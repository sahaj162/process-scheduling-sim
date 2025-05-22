"use client";

import ShineBorder from "@/components/ui/shine-border";
import Image from "next/image";

export function ScreenshotCard() {
  return (
    <ShineBorder
      className="relative w-full overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm transition-all hover:scale-[1.02] duration-500"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      <div className="relative w-full aspect-[16/9]">
        <Image
          src="/cpu-sched-sim.jpg"
          alt="CPU Scheduler Screenshot"
          fill
          priority
          className="object-contain"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </ShineBorder>
  );
} 