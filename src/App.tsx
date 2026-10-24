import './App.css'
import { ModeToggle } from "./ui/components/mode-toggle";
import { Timer } from "./ui/components/Timer";

function App() {
  return (
    <main className="min-h-screen w-full">
      <div className="flex w-full justify-end p-4">
        <ModeToggle />
      </div>

      <Timer />
    </main>
  );
}

export default App;
