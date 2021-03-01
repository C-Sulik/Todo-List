import React from "react";
import { Title } from "./Title";

import styles from "./styles.module.css";

export function ToDoItem({ todo, onEdit, onDelete, onSelect, className }) {
  const toggleTodoCompleted = () => {
    onEdit(todo.id, { completed: !todo.completed });
  };

  const handleSelectTodo = (event) => {
    if (event.target === event.currentTarget) {
      onSelect(todo.id);
    }
  };

  const handleDeleteTodo = () => {
    onDelete(todo.id);
  };

  return (
    <div className={className} onClick={handleSelectTodo}>
      <input
        className={styles["todo-checkbox"]}
        type="checkbox"
        onChange={toggleTodoCompleted}
        checked={todo.completed}
      />
      <Title todo={todo} onEdit={onEdit} />
      <button
        className={styles["del-btn"]}
        type="button"
        onClick={handleDeleteTodo}
      >
        X
      </button>
    </div>
  );
}
