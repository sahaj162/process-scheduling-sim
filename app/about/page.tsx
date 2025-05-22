"use client";

import { Cpu, Github, ExternalLink, Terminal, Gauge, Code2 } from "lucide-react"
import Link from "next/link"
import { GridPattern } from "@/components/ui/grid-pattern"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col bg-background">
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

      {/* Hero section */}
      <section className="relative w-full flex flex-col pt-24 md:pt-32 px-4">
        <div className="relative max-w-[1000px] w-full mx-auto flex flex-col space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl/none">
              About
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                CPU Scheduler Simulator
              </span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
              An educational tool that helps you understand complex CPU scheduling concepts using intuitive visualizations
            </p>
          </div>
        </div>
      </section>

      {/* Terminal-like section */}
      <section className="relative w-full flex flex-col items-center py-12 px-4">
        <div className="max-w-[1000px] w-full">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p className="text-lg text-gray-300 font-mono">
              <span className="text-green-400">$</span> A powerful educational tool that transforms complex CPU scheduling concepts into interactive visualizations. Watch processes execute in real-time and understand how different scheduling algorithms affect system performance.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative w-full flex flex-col items-center py-24 px-4">
        <div className="max-w-[1200px] w-full space-y-16">
          {/* Algorithms section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">
                Scheduling Algorithms
              </h2>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                Explore different CPU scheduling strategies through interactive simulations
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "First Come First Serve (FCFS)",
                  description: "Processes are executed in the order they arrive"
                },
                {
                  name: "Shortest Job First (SJF)",
                  description: "Executes the process with shortest burst time first"
                },
                {
                  name: "Round Robin (RR)",
                  description: "Each process gets a small unit of CPU time in circular order"
                },
                {
                  name: "Shortest Remaining Time First (SRTF)",
                  description: "Preemptive version of SJF"
                }
              ].map((algo) => (
                <div
                  key={algo.name}
                  className="relative group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">{algo.name}</h3>
                    <p className="text-muted-foreground">{algo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">
                Core Features
              </h2>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                Everything you need to understand CPU scheduling
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Process Management",
                  description: "Create, modify, and visualize process execution in real-time",
                  icon: Terminal
                },
                {
                  title: "Performance Metrics",
                  description: "Analyze waiting time, turnaround time, and CPU utilization",
                  icon: Gauge
                },
                {
                  title: "Algorithm Comparison",
                  description: "Compare different scheduling algorithms side by side",
                  icon: Cpu
                },
                {
                  title: "Visual Timeline",
                  description: "Watch the Gantt chart update as processes execute",
                  icon: Code2
                }
              ].map((feature) => (
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
          </section>

          {/* Open Source section */}
          <section className="w-full flex flex-col items-center py-12">
            <div className="max-w-[600px] w-full">
              <div className="relative rounded-xl border border-border bg-card p-8 md:p-12 text-center">
                <div className="flex flex-col items-center space-y-6">
                  <h2 className="text-3xl font-bold md:text-4xl">
                    Open Source
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Explore the source code, contribute improvements, or report issues.
                  </p>
                  <Link
                    href="https://github.com/CubeStar1/process-scheduling-sim"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    target="_blank"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 