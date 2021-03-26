import React, { useState } from "react";
import styles from "./styles.module.css";

interface AddTodoPropsI {
  onAdd: (title: string) => void;
}
export const AddToDo: React.FC<AddTodoPropsI> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim()) onAdd(title);
    setTitle("");
  };

  return (
    <form className={styles["add-form"]} onSubmit={handleAddTodo}>
      <input
        className={styles["form-input"]}
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button type="submit" className={styles["form-submit"]}>
        +
      </button>
    </form>
  );
};
