import { useEffect, useState } from "react";
import { Button } from "../button";

function FlipDigit({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-28 w-24 overflow-hidden rounded-xl bg-neutral-900 text-white shadow-xl sm:h-36 sm:w-32">
        {/* Top half */}
        <div className="flex h-1/2 items-end justify-center overflow-hidden bg-neutral-800">
          <span className="translate-y-1/2 font-mono text-6xl font-bold sm:text-7xl">
            {value}
          </span>
        </div>

        {/* Bottom half */}
        <div className="flex h-1/2 items-start justify-center overflow-hidden border-t-2 border-black/40 bg-neutral-900">
          <span className="-translate-y-1/2 font-mono text-6xl font-bold sm:text-7xl">
            {value}
          </span>
        </div>

        {/* Center hinge */}
        <div className="absolute left-0 top-1/2 h-px w-full bg-black/60" />
      </div>

      <span className="text-sm uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Timer() {
  const initialTime = 5 * 60;

  const [secondsLeft, setSecondsLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          setIsRunning(false);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (secondsLeft % 60)
    .toString()
    .padStart(2, "0");

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(initialTime);
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-bold tracking-tight">
        Timer
      </h1>

      <div className="flex items-center gap-4 sm:gap-6">
        <FlipDigit value={minutes} label="Minutes" />

        <span className="mb-8 text-4xl font-bold">:</span>

        <FlipDigit value={seconds} label="Seconds" />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          disabled={secondsLeft === 0}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>

        <Button variant="outline" onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </div>
  );
}