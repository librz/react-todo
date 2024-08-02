import { v4 as uuidv4 } from "uuid";
import { ITodoItem } from "./interface";

function delay(ms: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("yay!");
    }, ms);
  });
}

export function fetchTodos(): Promise<ITodoItem[]> {
  const fakeTodos: ITodoItem[] = [
    {
      id: uuidv4(),
      description: "eat dinner",
    },
    {
      id: uuidv4(),
      description: "watch moive",
    },
  ];
  return delay(2000).then(() => fakeTodos);
}

export function fetchAddTodo(description: string): Promise<ITodoItem> {
  const todo: ITodoItem = {
    id: uuidv4(),
    description: description,
  };
  return delay(1500).then(() => todo);
}

export function fetchRemoveTodo(id: string): Promise<any> {
  return delay(1000);
}
