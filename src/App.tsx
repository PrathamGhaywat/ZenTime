import './App.css'
import { ModeToggle } from "./ui/components/mode-toggle";
import { TodoList } from './ui/components/TodoList';
import { Timer } from "./ui/components/Timer";

function App() {
  return (
    <main className="min-h-screen w-full">
      <div className="flex w-full justify-end p-4">
        <ModeToggle />
      </div>
      <div className='mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 px-4 py-8 md:grid-cols-2'>
        <Timer />
        <TodoList />
      </div>
    </main>
  );
}

export default App;
