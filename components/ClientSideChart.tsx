"use client";

import GanttChart from "./GanttChart";
import { SummaryTable } from "./SummaryTable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

export function ClientSideChart({ processes, resultSequence, algorithm }: {
  processes: any[];
  resultSequence: any[];
  algorithm: string;
}) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Gantt Chart</CardTitle>
          <CardDescription>Visual representation of process execution</CardDescription>
        </CardHeader>
        <CardContent>
          <GanttChart processes={resultSequence} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Process Details</CardTitle>
          <CardDescription>Detailed timing analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <SummaryTable
            originalProcesses={processes}
            scheduledProcesses={resultSequence}
            algorithm={algorithm}
          />
        </CardContent>
      </Card>
    </div>
  );
} 