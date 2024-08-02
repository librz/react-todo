import React, { FC, useState } from "react";
import { FaSpinner, FaWindowClose } from "react-icons/fa";
import { ITodoItem } from "../interface";
import { fetchRemoveTodo } from "../services";
import "./index.css";

interface IProps {
  todo: ITodoItem;
  selected?: boolean;
  onSelect: () => void;
  onDeleted: () => void;
}

const TodoItem: FC<IProps> = ({ todo, selected, onSelect, onDeleted }) => {
  const [removing, setRemoving] = useState(false);
  async function removeTodoAsync() {
    try {
      setRemoving(true);
      await fetchRemoveTodo(todo.id);
      onDeleted();
    } catch (err) {
      alert("Failed to remove todo");
    } finally {
      setRemoving(false);
    }
  }
  return (
    <div
      className={`todo-item ${selected ? "todo-item-selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className={"todo-item-description"}>{todo.description}</div>
      {removing ? (
        <FaSpinner />
      ) : (
        <FaWindowClose
          fontSize={24}
          className={"todo-item-delete"}
          onClick={(e) => {
            e.stopPropagation();
            removeTodoAsync();
          }}
        />
      )}
    </div>
  );
};

export default TodoItem;
