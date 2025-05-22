"use client";

import { useTheme } from "next-themes";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { ArrowRight, Cpu, Gauge, LineChart, Timer } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScreenshotCard } from "@/components/ui/screenshot-card";

const features = [
  {
    title: "Multiple Algorithms",
    description: "Explore different CPU scheduling algorithms including FCFS, Round Robin, SJF, and SRTF",
    icon: Cpu,
  },
  {
    title: "Real-time Visualization",
    description: "Interactive Gantt charts that visualize process execution in real-time",
    icon: LineChart,
  },
  {
    title: "Performance Metrics",
    description: "Calculate and compare waiting times, turnaround times, and other key metrics",
    icon: Gauge,
  },
  {
    title: "Time Quantum Control",
    description: "Experiment with different time quantum values for Round Robin scheduling",
    icon: Timer,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center bg-background">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray="4 2"
          className={cn(
            "absolute inset-0",
            "[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"
          )}
        />
      </div>

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center pt-24 md:pt-32 px-4">
        <div className="relative max-w-[1000px] w-full flex flex-col items-center space-y-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl/none">
              Master CPU Scheduling,
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                one algorithm at a time.
              </span>
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl">
              Interactive visualizations for CPU scheduling algorithms. Perfect for students and educators.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Link href="/simulator">
              <RainbowButton>
                Try Simulator <ArrowRight className="ml-2 h-4 w-4" />
              </RainbowButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full flex flex-col items-center py-24 md:py-32 px-4">
        <div className="max-w-[1200px] w-full flex flex-col items-center space-y-16">
          <div className="text-center space-y-4 max-w-[600px]">
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools to understand and visualize CPU scheduling algorithms
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative z-10">
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="w-full flex flex-col items-center py-24 px-4 bg-gradient-to-b from-background via-background/50 to-background">
        <div className="max-w-[1200px] w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold md:text-4xl">
              Intuitive Interface
            </h2>
            <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
              Visualize and understand CPU scheduling algorithms through our interactive simulator
            </p>
          </div>
          <ScreenshotCard />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center py-24 md:py-32 px-4">
        <div className="max-w-[600px] w-full">
          <div className="relative rounded-xl border border-border bg-card p-8 md:p-12 text-center">
            <div className="flex flex-col items-center space-y-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to start learning?
              </h2>
              <p className="text-muted-foreground text-lg max-w-[400px]">
                Jump into our interactive simulator and master CPU scheduling algorithms.
              </p>
              <Link href="/simulator">
                <RainbowButton>
                  Launch Simulator <ArrowRight className="ml-2 h-4 w-4" />
                </RainbowButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
