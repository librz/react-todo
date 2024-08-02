import React from "react";
import { useTodos } from "./use-todos";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import "./index.css";

export default function Todos() {
  const { loading, state, dispatch } = useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"todos-container"}>
      {state.todos.map((it) => {
        return (
          <TodoItem
            key={it.id}
            todo={it}
            selected={Boolean(state.selectedId && state.selectedId === it.id)}
            onSelect={() => {
              dispatch({
                type: "select",
                payload: { id: it.id },
              });
            }}
            onDeleted={() => {
              dispatch({ type: "delete", payload: { id: it.id } });
            }}
          />
        );
      })}
      <AddTodo
        onAdded={(newTodo) => {
          dispatch({
            type: "add",
            payload: newTodo,
          });
        }}
      />
    </div>
  );
}
