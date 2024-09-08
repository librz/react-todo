import { v4 as uuidv4 } from "uuid";
import { ITodoItem } from "./interface";

function delay(ms: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("yay!");
    }, ms);
  });
}

export async function fetchTodos(): Promise<ITodoItem[]> {
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
  await delay(500);
  return fakeTodos;
}

export async function fetchAddTodo(description: string): Promise<ITodoItem> {
  const todo: ITodoItem = {
    id: uuidv4(),
    description: description,
  };
  await delay(1000);
  return todo;
}

export function fetchRemoveTodo(_id: string): Promise<unknown> {
  return delay(1000);
}
