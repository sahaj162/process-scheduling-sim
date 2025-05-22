import { turnaroundTime, waitingTime, cpuUtilization, totalExecutionTime } from "./SummaryTable"
import { Card } from "./ui/card";
import { Clock, Timer, Cpu, Activity } from "lucide-react"; // Import icons

type Process = {
  process_id: number;
  arrival_time: number;
  burst_time: number;
  background: string;
};

type totalProcessesType = {
  totalProcesses: number;
  scheduledProcesses: Process[];
};

export default function SummaryStatistics({ totalProcesses, scheduledProcesses }: totalProcessesType) {
  const stats = [
    {
      label: "Avg Waiting Time",
      value: Math.round((waitingTime / totalProcesses) * 100) / 100,
      icon: Clock,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Avg Turnaround Time",
      value: Math.round((turnaroundTime / totalProcesses) * 100) / 100,
      icon: Timer,
      color: "bg-green-500/10 text-green-500",
    },
    {
      label: "Throughput",
      value: Math.round((totalProcesses / totalExecutionTime) * 100) / 100,
      icon: Activity,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      label: "CPU Utilization",
      value: `${Math.round(cpuUtilization * 100) / 100}%`,
      icon: Cpu,
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <div className="grid gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className={`p-4 transition-all hover:scale-105 ${stat.color}`}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-background">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}