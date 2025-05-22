"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Pencil1Icon } from "@radix-ui/react-icons";
import { ProcessForm } from "@/components/ProcessForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import GanttChart from "./GanttChart";
import { SummaryTable } from "./SummaryTable";
import { firstComeFirstServe } from "@/lib/FirstComeFirstServe";
import { shortestJobFirst } from "@/lib/ShortestJobFirst";
import { roundRobin } from "@/lib/RoundRobin";
import { shortestRemainingTimeFirst } from "@/lib/ShortestRemainingTimeFirst";
import SummaryStatistics from "./SummaryStatistics";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormSchema = z.object({
  algorithm: z.string({
    required_error: "Please select an algorithm to display.",
  }),
  quantum: z.coerce
    .number()
    .lte(100, {
      message: "Quantum cannot be greater than 100.",
    })
    .optional(),
});

type Process = {
  process_id: number;
  arrival_time: number;
  burst_time: number;
  background: string;
};

export default function MainForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [processes, setProcesses] = useState<Process[]>([]);

  const [resultSequence, setResultSequence] = useState<Process[]>([]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  const [finalizedProcesses, setFinalizedProcesses] = useState<Process[]>([]);

  const summaryRef = useRef<HTMLDivElement>(null);

  const addProcess = (newProcess: Omit<Process, "process_id">) => {
    if (currentEditIndex !== null) {
      // Edit existing process
      setProcesses((prevProcesses) =>
        prevProcesses.map((process, index) =>
          index === currentEditIndex
            ? { ...newProcess, process_id: process.process_id } // Retain original process_id
            : process
        )
      );
      setCurrentEditIndex(null); // Reset after editing
    } else {
      // Add new process
      setProcesses((prevProcesses) => [
        ...prevProcesses,
        { ...newProcess, process_id: prevProcesses.length + 1 }, // Assign process_id based on array length
      ]);
    }
    setPopoverOpen(false); // Close popover after adding/editing
  };

  const handleEditProcess = (index: number) => {
    setCurrentEditIndex(index);
    setPopoverOpen(true); // Open popover for editing
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let sequence: Process[] = [];
    if (processes.length === 0) {
      toast.error("No processes added!", {
        position: "top-center",
      });
      return;
    }
    switch (data.algorithm) {
      case "fCFS":
        sequence = firstComeFirstServe(processes);
        break;
      case "SJF":
        sequence = shortestJobFirst(processes);
        break;
      case "RR":
        sequence = roundRobin(processes, data.quantum ?? 0);
        break;
      case "SRTF":
        sequence = shortestRemainingTimeFirst(processes);
      default:
        break;
    }

    setResultSequence(sequence);
    setFinalizedProcesses([...processes]);
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
      {/* Top Section - Algorithm Selection and Process Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Algorithm Selection Card */}
        <Card className="backdrop-blur-sm bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Algorithm Configuration</CardTitle>
            <CardDescription>Choose and configure your scheduling algorithm</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="algorithm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheduling Algorithm</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedAlgorithm(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                            <SelectValue placeholder="Select an algorithm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fCFS">First Come First Serve</SelectItem>
                          <SelectItem value="RR">Round Robin</SelectItem>
                          <SelectItem value="SJF">Shortest Job First</SelectItem>
                          <SelectItem value="SRTF">Shortest Remaining Time First</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedAlgorithm === "RR" && (
                  <FormField
                    control={form.control}
                    name="quantum"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Quantum</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="Enter time quantum"
                            className="bg-background/50 backdrop-blur-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Simulate
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Process Management Card */}
        <Card className="backdrop-blur-sm bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Process Management</CardTitle>
            <CardDescription>Add and configure processes for simulation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {processes.map((process, index) => (
                <div 
                  key={index} 
                  className="relative group p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-10 rounded-lg"
                    style={{ backgroundColor: process.background }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Process {index + 1}</p>
                      <button
                        onClick={() => handleEditProcess(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Pencil1Icon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Arrival: {process.arrival_time}</p>
                      <p>Burst: {process.burst_time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-4">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-background/50 backdrop-blur-sm">
                    Add Process
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 backdrop-blur-sm bg-card/50">
                  <ProcessForm
                    addProcess={addProcess}
                    initialValues={currentEditIndex !== null ? processes[currentEditIndex] : undefined}
                  />
                </PopoverContent>
              </Popover>
              <Button 
                variant="outline"
                onClick={() => setProcesses([])}
                disabled={processes.length === 0}
                className="bg-background/50 backdrop-blur-sm"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      {finalizedProcesses.length > 0 && (
        <div ref={summaryRef} className="space-y-8">
          {/* Gantt Chart Card */}
          <Card className="backdrop-blur-sm bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Gantt Chart</CardTitle>
              <CardDescription>Visual representation of process execution over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full p-4">
                <GanttChart processes={resultSequence} />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Summary Statistics Card */}
            <Card className="lg:col-span-1 backdrop-blur-sm bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key scheduling metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <SummaryStatistics
                  totalProcesses={finalizedProcesses.length}
                  scheduledProcesses={resultSequence}
                />
              </CardContent>
            </Card>

            {/* Process Details Table Card */}
            <Card className="lg:col-span-3 backdrop-blur-sm bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Process Details</CardTitle>
                <CardDescription>Detailed breakdown of process execution times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <SummaryTable
                    originalProcesses={finalizedProcesses}
                    scheduledProcesses={resultSequence}
                    algorithm={selectedAlgorithm}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      <ToastContainer className="bg-dark"/>
    </div>
  );
}
