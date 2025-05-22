import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { shortestRemainingTimeFirst } from "@/lib/ShortestRemainingTimeFirst";
import { ClientSideChart } from "@/components/ClientSideChart";

const exampleProcesses = [
  { process_id: 1, arrival_time: 0, burst_time: 7, background: "#FF5733" },
  { process_id: 2, arrival_time: 1, burst_time: 5, background: "#33FF57" },
  { process_id: 3, arrival_time: 2, burst_time: 3, background: "#3357FF" },
  { process_id: 4, arrival_time: 3, burst_time: 1, background: "#FF33E9" },
];

export default async function SRTFPage() {
  const resultSequence = shortestRemainingTimeFirst(exampleProcesses);

  return (
    <div className="container max-w-6xl mx-auto py-20 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Shortest Remaining Time First (SRTF)</h1>
        <p className="text-lg text-muted-foreground">
          SRTF is the preemptive version of SJF scheduling. In this algorithm, the process with the 
          smallest remaining time is selected for execution. The running process can be preempted by 
          a newly arrived process with shorter burst time.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>SRTF is a preemptive scheduling algorithm where:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>The process with the smallest remaining time is always selected for execution</li>
            <li>A running process can be preempted by a new process with shorter remaining time</li>
            <li>If a new process arrives with shorter burst time, current process is preempted</li>
            <li>Provides optimal average waiting time for a given set of processes</li>
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
              algorithm="SRTF"
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
                <li>Optimal average waiting time</li>
                <li>Favors short processes</li>
                <li>Responsive to new short processes</li>
                <li>Better than non-preemptive SJF</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>High context switching overhead</li>
                <li>Starvation of longer processes</li>
                <li>Difficult to implement</li>
                <li>Requires continuous monitoring of remaining times</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 