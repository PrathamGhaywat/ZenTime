import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Textarea } from "../textarea";

type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  notes: string;
};

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readEvents(): CalendarEvent[] {
  try {
    const saved = localStorage.getItem("zentime-calendar-events");
    return saved ? JSON.parse(saved) as CalendarEvent[] : [];
  } catch {
    return [];
  }
}

export function CalendarPage() {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() => localDateKey(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>(readEvents);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    localStorage.setItem("zentime-calendar-events", JSON.stringify(events));
  }, [events]);

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const leadingDays = (firstWeekday + 6) % 7;
  const cells = [
    ...Array.from({ length: leadingDays }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const selectedEvents = events.filter((event) => event.date === selectedDate);

  function addEvent() {
    if (!title.trim()) return;

    setEvents((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        date: selectedDate,
        title: title.trim(),
        notes: notes.trim(),
      },
    ]);

    setTitle("");
    setNotes("");
  }

  function changeMonth(amount: number) {
    setMonth(new Date(year, monthIndex + amount, 1));
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <CalendarDays className="h-8 w-8" />
          Calendar
        </h1>
        <p className="mt-2 text-muted-foreground">
          Keep track of plans, reminders, and important dates.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>
                {month.toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </CardTitle>

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => (
                  <div
                    key={day}
                    className="py-2 text-xs font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                )
              )}

              {cells.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} />;
                }

                const date = localDateKey(new Date(year, monthIndex, day));
                const isSelected = date === selectedDate;
                const isToday = date === localDateKey(new Date());
                const hasEvents = events.some((event) => event.date === date);

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    aria-pressed={isSelected}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors hover:bg-accent ${
                      isSelected
                        ? "bg-primary text-primary-foreground hover:bg-primary"
                        : isToday
                          ? "border border-primary"
                          : ""
                    }`}
                  >
                    {day}
                    {hasEvents && (
                      <span
                        className={`absolute bottom-1 h-1 w-1 rounded-full ${
                          isSelected ? "bg-primary-foreground" : "bg-primary"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                undefined,
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Event title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addEvent();
                }}
              />

              <Textarea
                placeholder="Notes (optional)"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
              />

              <Button
                onClick={addEvent}
                disabled={!title.trim()}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add event
              </Button>
            </div>

            <div className="border-t pt-4">
              <p className="mb-3 text-sm font-medium">
                Events · {selectedEvents.length}
              </p>

              {selectedEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nothing planned for this day.
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-2 rounded-lg border p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="wrap-break-word font-medium">
                          {event.title}
                        </p>
                        {event.notes && (
                          <p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm text-muted-foreground">
                            {event.notes}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() =>
                          setEvents((current) =>
                            current.filter((item) => item.id !== event.id)
                          )
                        }
                        aria-label={`Delete ${event.title}`}
                        title="Delete event"
                      >
                        <Trash2 className="h-4 w-4" color="red" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}