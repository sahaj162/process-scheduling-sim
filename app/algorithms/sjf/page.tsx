import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { shortestJobFirst } from "@/lib/ShortestJobFirst";
import { ClientSideChart } from "@/components/ClientSideChart";

const exampleProcesses = [
  { process_id: 1, arrival_time: 0, burst_time: 6, background: "#FF5733" },
  { process_id: 2, arrival_time: 1, burst_time: 4, background: "#33FF57" },
  { process_id: 3, arrival_time: 2, burst_time: 2, background: "#3357FF" },
  { process_id: 4, arrival_time: 3, burst_time: 3, background: "#FF33E9" },
];

export default async function SJFPage() {
  const resultSequence = shortestJobFirst(exampleProcesses);

  return (
    <div className="container max-w-6xl mx-auto py-20 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Shortest Job First (SJF)</h1>
        <p className="text-lg text-muted-foreground">
          Shortest Job First is a scheduling algorithm that selects the process with the smallest burst time first.
          It is optimal in terms of average waiting time for a given set of processes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>SJF is a non-preemptive scheduling algorithm where:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Processes are executed based on burst time, shortest first</li>
            <li>If two processes have the same burst time, FCFS is used</li>
            <li>Process runs to completion once started</li>
            <li>Requires prediction of burst time</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
          <CardDescription>
            Consider the following processes
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
              algorithm="SJF"
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
                <li>Minimum average waiting time</li>
                <li>Maximum throughput</li>
                <li>Good for batch systems</li>
                <li>Simple to implement</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Possibility of starvation for longer processes</li>
                <li>Requires prediction of burst time</li>
                <li>Not suitable for interactive systems</li>
                <li>Convoy effect possible if short processes arrive after long ones</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 