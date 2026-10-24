import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Checkbox } from "../checkbox";
import { Button } from "../button";
import { Trash } from "lucide-react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    function addTodo() {
        const text = newTodo.trim();

        if (!text) return;

        setTodos((previous) => [
            ...previous,
            {
                id: Date.now(),
                text,
                completed: false,
            },
        ]);

        setNewTodo("");
    }

    function toggleTodo(id: number) {
        setTodos((previous) => 
            previous.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
        ));
    }

    function deleteTodo(id: number) {
        setTodos((previous) => 
            previous.filter((todo) => todo.id !== id)
        );
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Todo
                    <span className="text-sm font-normal text-muted-foreground">
                        {todos.filter((todo) => !todo.completed).length} remaining
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <form
                    className="flex gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();
                        addTodo();
                    }}>
                        <Input
                            placeholder="What needs to be done?"
                            value={newTodo}
                            onChange={(event) => setNewTodo(event.target.value)} 
                        />
                    </form>

                    <div className="space-y-3">
                        {todos.length === 0 && (
                            <p className="py-6 text-center text-sm text-muted-foreground">No tasks yet. Add your first task!</p>
                        )}

                        {todos.map((todo) => (
                            <div key={todo.id} className="flex items-center gap-3 rounded-lg border p-3">
                                <Checkbox
                                    checked={todo.completed}
                                    onCheckedChange={() => toggleTodo(todo.id)} 
                                    aria-label={`Mark ${todo.text} as completed`}
                                />

                                <span
                                    className={`flex-1 break-words text-sm ${
                                        todo.completed
                                            ? "text-muted-foreground line-through"
                                            : ""  
                                    }`}>
                                        {todo.text}
                                    </span>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteTodo(todo.id)}
                                        aria-label={`Delete ${todo.text}`}>
                                            <Trash color="red" />
                                        </Button>
                            </div>
                        ))}
                    </div>
            </CardContent>
        </Card>
    );
}