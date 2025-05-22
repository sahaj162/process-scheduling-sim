import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roundRobin } from "@/lib/RoundRobin";
import { ClientSideChart } from "@/components/ClientSideChart";

const exampleProcesses = [
  { process_id: 1, arrival_time: 0, burst_time: 8, background: "#FF5733" },
  { process_id: 2, arrival_time: 1, burst_time: 4, background: "#33FF57" },
  { process_id: 3, arrival_time: 2, burst_time: 9, background: "#3357FF" },
  { process_id: 4, arrival_time: 3, burst_time: 5, background: "#FF33E9" },
];

const TIME_QUANTUM = 3;

export default async function RoundRobinPage() {
  const resultSequence = roundRobin(exampleProcesses, TIME_QUANTUM);

  return (
    <div className="container max-w-6xl mx-auto py-20 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Round Robin (RR)</h1>
        <p className="text-lg text-muted-foreground">
          Round Robin is a CPU scheduling algorithm that assigns a fixed time quantum to each process in a circular queue.
          It is designed specifically for time-sharing systems.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Round Robin is a preemptive scheduling algorithm where:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Each process gets a fixed time quantum (time slice)</li>
            <li>After the time quantum expires, the process is preempted and added to the end of the ready queue</li>
            <li>The context switch happens even if the process hasn&apos;t completed</li>
            <li>If a process&apos;s remaining burst time is less than the time quantum, it runs to completion</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
          <CardDescription>
            Consider the following processes with Time Quantum = {TIME_QUANTUM}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Process</th>
                    <th className="border p-2">Arrival Time</th>
                    <th className="border p-2">Burst Time</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleProcesses.map((process) => (
                    <tr key={process.process_id}>
                      <td className="border p-2 text-center">P{process.process_id}</td>
                      <td className="border p-2 text-center">{process.arrival_time}</td>
                      <td className="border p-2 text-center">{process.burst_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ClientSideChart 
              processes={exampleProcesses}
              resultSequence={resultSequence}
              algorithm="RR"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advantages & Disadvantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Advantages</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Fair allocation of CPU to all processes</li>
                <li>Good for time-sharing environments</li>
                <li>Better response time for short processes</li>
                <li>No starvation as each process gets fair share</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Higher context switching overhead</li>
                <li>Performance depends on time quantum size</li>
                <li>No priority handling</li>
                <li>Higher average waiting time than SJF</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 