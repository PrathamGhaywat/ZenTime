import { ModeToggle } from "./ui/components/mode-toggle";
import { Timer } from "./ui/components/Timer";
import { TodoList } from "./ui/components/TodoList";
import "./App.css"
import { MusicPlayer } from "./ui/components/MusicPlayer";
import {
  Timer as TimerIcon, // we already have a timer component!
  Globe2,
  CalendarDays,
} from "lucide-react"
import { useState } from "react";
import { WorldClock } from "./ui/components/WorldClock";
import { CalendarPage } from "./ui/components/CalenderPage";

type Page = "timer" | "world-clock" | "calendar";

const nav = [
  { id: "timer", label: "Timer", icon: TimerIcon},
  { id: "world-clock", label: "World Clock", icon: Globe2},
  { id: "calendar", label: "Calendar", icon: CalendarDays},
] as const;

function App() {
  const [page, setPage] = useState<Page>("timer");

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Floating sidebar */}
      <aside
        className="fixed left-3 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border bg-card/90 p-2 shadow-xl backdrop-blur-md"
        aria-label="Main navigation"
      >
        {nav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            title={label}
            aria-label={label}
            aria-current={page === id ? "page" : undefined}
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
              page === id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </aside>

      {/* Main page */}
      <div className="min-h-dvh pl-[76px]">
        <header className="flex justify-end px-4 py-3">
          <ModeToggle />
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 pb-6">
          {page === "timer" && (
            <div className="flex flex-col gap-4">
              <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="min-w-0">
                  <Timer />
                </div>
                <div className="min-w-0">
                  <TodoList />
                </div>
              </section>

              <section className="h-[400px] min-h-[400px]">
                <MusicPlayer />
              </section>
            </div>
          )}

          {page === "world-clock" && <WorldClock />}
          {page === "calendar" && <CalendarPage />}
        </main>
      </div>
    </div>
  );
}

export default App;