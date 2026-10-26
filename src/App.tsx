import { ModeToggle } from "./ui/components/mode-toggle";
import { Timer } from "./ui/components/Timer";
import { TodoList } from "./ui/components/TodoList";
import { MusicHub } from "./ui/components/MusicHub";
import "./App.css"

function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="flex items-center justify-end px-4 py-2">
        <ModeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="min-w-0">
            <Timer />
          </div>

          <div className="min-w-0">
            <TodoList />
          </div>
        </section>

        <section className="min-h-100 w-full">
          <MusicHub />
        </section>
      </main>
    </div>
  );
}

export default App;