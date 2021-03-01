import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

const TitleEditor = ({ todo, isEdit, onEdit, setIsEdit }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const titleEditInputRef = useRef(null);

  const submitNewTitle = (event) => {
    event.preventDefault();
    if (newTitle.trim()) onEdit(todo.id, { title: newTitle });
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit && titleEditInputRef) titleEditInputRef.current.focus();
  }, [isEdit]);

  return (
    <form className={styles["edit-form"]} onSubmit={submitNewTitle}>
      <input
        ref={titleEditInputRef}
        type="text"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        className={styles["edit-input"]}
      />
      <button className={styles["edit-btn"]} type="submit">
        S
      </button>
    </form>
  );
};

export const Title = ({ onEdit, todo }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <TitleEditor
      todo={todo}
      isEdit={isEdit}
      onEdit={onEdit}
      setIsEdit={setIsEdit}
    />
  ) : (
    <>
      <p className={styles["todo-text"]}>{todo.title}</p>
      <button
        className={styles["edit-btn"]}
        type="button"
        onClick={() => setIsEdit(true)}
      >
        E
      </button>
    </>
  );
};
