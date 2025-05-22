import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
let waitingTime = 0;
let turnaroundTime = 0;
let cpuUtilization = 0;
let totalExecutionTime = 0;// New variable to export CPU utilization

type Process = {
  process_id: number;
  arrival_time: number;
  burst_time: number;
  background: string;
};

type SummaryTableProps = {
  originalProcesses: Process[];
  scheduledProcesses: Process[];
  algorithm: string;
};

export function SummaryTable({
  originalProcesses,
  scheduledProcesses,
  algorithm,
}: SummaryTableProps) {
  const [animationKey, setAnimationKey] = useState(0);

  // Update the animation key whenever scheduledProcesses changes to re-trigger the animation
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [scheduledProcesses]);

  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;

  // Initialize calculated processes without waiting time calculation
  const calculatedProcesses = originalProcesses.map((process) => {
    return {
      ...process,
      waitingTime: 0,
      turnaroundTime: 0,
    };
  });

  // If the algorithm is FCFS, calculate waiting and turnaround times after sorting by arrival time
if (algorithm === "fCFS") {
  // Sort processes by arrival time for FCFS order, ignoring idle processes
  const sortedProcesses = [...calculatedProcesses].sort(
    (a, b) => a.arrival_time - b.arrival_time
  );

  let cumulativeTime = 0;

  // Calculate waiting time and turnaround time for each process
  sortedProcesses.forEach((process) => {
    // Skip idle periods (arrival_time === -1) and adjust cumulative time for gaps
    if (process.arrival_time === -1) {
      return; // Ignore idle periods for waiting and turnaround calculations
    }

    // If the next process arrives after the current cumulative time, update for idle time
    if (process.arrival_time > cumulativeTime) {
      cumulativeTime = process.arrival_time; // Adjust to next process arrival, skipping idle time
    }

    // Waiting time is the difference between cumulative time and arrival time
    process.waitingTime = Math.max(0, cumulativeTime - process.arrival_time);

    // Turnaround time is waiting time + burst time
    process.turnaroundTime = process.waitingTime + process.burst_time;

    // Update cumulative time by adding the current process's burst time
    cumulativeTime += process.burst_time;

    // Update totals
    totalWaitingTime += process.waitingTime;
    totalTurnaroundTime += process.turnaroundTime;
  });
} else {
  // For other algorithms, use intervals in scheduledProcesses
  calculatedProcesses.forEach((process) => {
    const intervals = scheduledProcesses.filter(
      (scheduledProcess) => scheduledProcess.process_id === process.process_id
    );

    let processStartTime = process.arrival_time;
    let waitingTime = 0;

    intervals.forEach((interval) => {
      if (processStartTime < interval.arrival_time) {
        waitingTime += interval.arrival_time - processStartTime;
      }
      processStartTime = interval.arrival_time + interval.burst_time;
    });

    const turnaroundTime =
      waitingTime +
      intervals.reduce((sum, interval) => sum + interval.burst_time, 0);

    process.waitingTime = waitingTime;
    process.turnaroundTime = turnaroundTime;

    // Update cumulative totals
    totalWaitingTime += waitingTime;
    totalTurnaroundTime += turnaroundTime;
  });
}

  waitingTime = totalWaitingTime;
  turnaroundTime = totalTurnaroundTime;

  // Calculate CPU utilization
  const totalBurstTime = scheduledProcesses.reduce(
    (sum, process) => process.arrival_time !== -1?sum + process.burst_time:sum+0  ,
    0
  );

  const startTime = Math.min(
    ...scheduledProcesses.map((process) => process.arrival_time)
  );
  const endTime =
    startTime +
    scheduledProcesses.reduce((sum, process) => sum + process.burst_time, 0);

  totalExecutionTime = endTime - startTime;

  cpuUtilization = (totalBurstTime / totalExecutionTime) * 100;

  const popOutVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={popOutVariants}
      key={animationKey}
      className="rounded-lg border bg-card"
    >
      <Table>
        <TableCaption className="pb-4">
          Process execution summary with timing analysis
        </TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px] text-center bg-muted/50">
              <p className="text-xs md:text-sm font-medium">Process ID</p>
            </TableHead>
            <TableHead className="text-center bg-muted/50">
              <p className="text-xs md:text-sm font-medium">Arrival Time</p>
            </TableHead>
            <TableHead className="text-center bg-muted/50">
              <p className="text-xs md:text-sm font-medium">Burst Time</p>
            </TableHead>
            <TableHead className="text-center bg-muted/50">
              <p className="text-xs md:text-sm font-medium">Waiting Time</p>
            </TableHead>
            <TableHead className="text-center bg-muted/50">
              <p className="text-xs md:text-sm font-medium">Turnaround Time</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calculatedProcesses.map((process) => (
            <TableRow 
              key={process.process_id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex justify-center">
                  <div
                    className="flex justify-center items-center h-8 w-8 rounded-lg text-white font-medium transition-transform hover:scale-110"
                    style={{
                      background: process.background,
                    }}
                  >
                    {process.process_id}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{process.arrival_time}</TableCell>
              <TableCell className="text-center">{process.burst_time}</TableCell>
              <TableCell className="text-center">{process.waitingTime}</TableCell>
              <TableCell className="text-center">{process.turnaroundTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
            <TableCell className="text-center font-bold">{totalWaitingTime}</TableCell>
            <TableCell className="text-center font-bold">{totalTurnaroundTime}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </motion.div>
  );
}

export { waitingTime, turnaroundTime, cpuUtilization , totalExecutionTime};
