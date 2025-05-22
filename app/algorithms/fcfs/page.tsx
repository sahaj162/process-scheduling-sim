import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { firstComeFirstServe } from "@/lib/FirstComeFirstServe";
import { ClientSideChart } from "@/components/ClientSideChart";

const exampleProcesses = [
  { process_id: 1, arrival_time: 0, burst_time: 6, background: "#FF5733" },
  { process_id: 2, arrival_time: 2, burst_time: 4, background: "#33FF57" },
  { process_id: 3, arrival_time: 4, burst_time: 2, background: "#3357FF" },
];

export default async function FCFSPage() {
  const resultSequence = firstComeFirstServe(exampleProcesses);

  return (
    <div className="container max-w-6xl mx-auto py-20 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">First Come First Serve (FCFS)</h1>
        <p className="text-lg text-muted-foreground">
          First Come First Serve is the simplest CPU scheduling algorithm. 
          In this scheme, the process that requests the CPU first is allocated the CPU first.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>FCFS is a non-preemptive scheduling algorithm where:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Processes are executed in the order they arrive in the ready queue</li>
            <li>Once a process gets CPU, it runs to completion</li>
            <li>Simple to implement but can lead to the convoy effect</li>
            <li>Not optimal for time-sharing systems</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
          <CardDescription>
            Consider the following processes with their arrival times and burst times
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
              algorithm="fCFS"
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
                <li>Simple to understand and implement</li>
                <li>No starvation</li>
                <li>Fair for equal length processes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Convoy effect</li>
                <li>High average waiting time</li>
                <li>Not suitable for interactive systems</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 