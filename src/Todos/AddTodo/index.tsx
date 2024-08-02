import React, { FC, useState, useRef } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { ITodoItem } from "../interface";
import { fetchAddTodo } from "../services";
import "./index.css";

interface IProps {
  onAdded: (todo: ITodoItem) => void;
}

const AddTodo: FC<IProps> = ({ onAdded }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [adding, setAdding] = useState(false);
  async function addTodoAsync(description: string) {
    try {
      setAdding(true);
      const newTodo = await fetchAddTodo(description);
      onAdded(newTodo);
      setInput("");
    } catch (err) {
      alert("Failed to add todo");
    } finally {
      setAdding(false);
      inputRef.current?.focus();
    }
  }
  function triggerAdd() {
    const value = input.trim();
    if (!value) {
      alert("Todo cannot be empty");
      inputRef.current?.focus();
      return;
    }
    addTodoAsync(value);
  }

  return (
    <section className={"add-todo"}>
      <input
        ref={inputRef}
        className={"add-todo-input"}
        value={input}
        onChange={(e) => {
          console.log("input change", e.target.value);
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            triggerAdd();
          }
        }}
      />
      {adding ? (
        <FaSpinner />
      ) : (
        <FaPlus
          className={"add-todo-btn"}
          onClick={(e) => {
            e.stopPropagation();
            triggerAdd();
          }}
        />
      )}
    </section>
  );
};

export default AddTodo;
