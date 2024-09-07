import { useState, useReducer, useEffect } from "react";
import { fetchTodos } from "./services";
import { ITodoItem, ITodoAction } from "./interface";

interface IState {
  selectedId?: string;
  todos: ITodoItem[];
}

function todoReducer(state: IState, action: ITodoAction): IState {
  switch (action.type) {
    case "set":
      return {
        todos: action.payload,
      };
    case "select":
      return {
        ...state,
        selectedId: action.payload.id,
      };
    case "add":
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      };
    case "delete": {
      const deletedTodo = state.todos.find((it) => it.id === action.payload.id);
      const filteredTodos = state.todos.filter(
        (it) => it.id !== action.payload.id,
      );
      if (deletedTodo?.id === state.selectedId) {
        // remove selectedId if the deleted todo is the selected one
        const { selectedId, ...otherState } = state;
        return {
          ...otherState,
          todos: filteredTodos,
        };
      } else {
        return {
          ...state,
          todos: filteredTodos,
        };
      }
    }
    default:
      throw new Error("[todoReducer]: Unknown action type");
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
