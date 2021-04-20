import React from "react";
import { Title } from "./Title";
import styles from "./styles.module.css";
import { TodoI } from "../../types";

interface TodoItemPropsI {
  todo: TodoI;
  className: string;
  listId: number;
  onEdit: (id: number, payload: Partial<TodoI>) => void;
  onDelete: (id: number, listId: number) => void;
  onSelect: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemPropsI> = ({
  todo,
  onEdit,
  onDelete,
  onSelect,
  className,
  listId,
}) => {
  const toggleTodoCompleted = () => {
    onEdit(todo.id, { completed: !todo.completed });
  };

  const handleSelectTodo = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onSelect(todo.id);
    }
  };

  const handleDeleteTodo = () => {
    onDelete(todo.id, listId);
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
};
