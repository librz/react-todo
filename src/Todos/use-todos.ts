import { useState, useReducer, useEffect } from "react";
import { fetchTodos } from "./services";
import { ITodoItem, ITodoAction } from "./interface";

interface IState {
  selectedId?: string;
  todos: ITodoItem[];
}

function todoReducer(state: IState, dispath: ITodoAction): IState {
  switch (dispath.type) {
    case "set":
      return {
        todos: dispath.payload,
      };
    case "select":
      return {
        ...state,
        selectedId: dispath.payload.id,
      };
    case "add":
      return {
        ...state,
        todos: state.todos.concat(dispath.payload),
      };
    case "delete":
      const deletedTodo = state.todos.find(
        (it) => it.id === dispath.payload.id,
      );
      const newTodos = state.todos.filter((it) => it.id !== dispath.payload.id);
      if (deletedTodo?.id === state.selectedId) {
        const { selectedId, ...otherState } = state;
        return {
          ...otherState,
          todos: newTodos,
        };
      } else {
        return {
          ...state,
          todos: newTodos,
        };
      }
    default:
      throw new Error("[todoReducer]: Unknown dispath type");
  }
}

export function useTodos() {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer<typeof todoReducer>(todoReducer, {
    todos: [],
  });

  useEffect(() => {
    async function loadTodosAsync() {
      try {
        setLoading(true);
        const todos = await fetchTodos();
        dispatch({ type: "set", payload: todos });
      } catch (err) {
        console.error(err);
        alert("Failed to load todos");
      } finally {
        setLoading(false);
      }
    }
    loadTodosAsync();
  }, []);

  return {
    loading,
    state,
    dispatch,
  };
}
