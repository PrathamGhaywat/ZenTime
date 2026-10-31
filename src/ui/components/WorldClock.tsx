import { useEffect, useState } from "react";
import { Globe2, Plus, X } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";

type Clock = {
  city: string;
  timeZone: string;
};

const DEFAULT_CLOCKS: Clock[] = [
  { city: "Local Time", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { city: "London", timeZone: "Europe/London" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
  { city: "New York", timeZone: "America/New_York" },
];

function readClocks(): Clock[] {
  try {
    const saved = localStorage.getItem("zentime-world-clocks");
    return saved ? JSON.parse(saved) as Clock[] : DEFAULT_CLOCKS;
  } catch {
    return DEFAULT_CLOCKS;
  }
}

function getDate(timeZone: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone,
  }).format(new Date());
}

export function WorldClock() {
  const [clocks, setClocks] = useState<Clock[]>(readClocks);
  const [city, setCity] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("zentime-world-clocks", JSON.stringify(clocks));
  }, [clocks]);

  function addClock() {
    const name = city.trim();
    const zone = timeZone.trim();

    if (!name || !zone) {
      setError("Enter both a city name and a time zone.");
      return;
    }

    try {
      // Validate the time-zone name.
      new Intl.DateTimeFormat("en", { timeZone: zone });

      if (clocks.some((clock) => clock.timeZone === zone)) {
        setError("That time zone is already on your list.");
        return;
      }

      setClocks((current) => [
        ...current,
        { city: name, timeZone: zone },
      ]);
      setCity("");
      setTimeZone("");
      setError("");
    } catch {
      setError("Invalid time zone. Try a name like Europe/Paris.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Globe2 className="h-8 w-8" />
          World Clock
        </h1>
        <p className="mt-2 text-muted-foreground">
          Keep track of time around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clocks.map((clock) => (
          <Card key={clock.timeZone} className="relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{clock.city}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {clock.timeZone}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-semibold tabular-nums">
                {getTimeZoneTime(clock.timeZone, now)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {getDate(clock.timeZone)}
              </p>

              {clock.timeZone !==
                Intl.DateTimeFormat().resolvedOptions().timeZone && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-3 h-8 w-8"
                  onClick={() =>
                    setClocks((current) =>
                      current.filter(
                        (item) => item.timeZone !== clock.timeZone
                      )
                    )
                  }
                  aria-label={`Remove ${clock.city}`}
                  title={`Remove ${clock.city}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add a clock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="City name (e.g. Paris)"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <Input
              placeholder="Time zone (e.g. Europe/Paris)"
              value={timeZone}
              onChange={(event) => setTimeZone(event.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button onClick={addClock}>
            <Plus className="mr-2 h-4 w-4" />
            Add clock
          </Button>

          <p className="text-xs text-muted-foreground">
            Examples: Europe/Paris, Asia/Seoul, Australia/Sydney,
            America/Los_Angeles.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function getTimeZoneTime(timeZone: string, timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(timestamp);
}