import React, { useState } from "react";
import { ToDoList } from "./List";
import { AddToDo } from "./AddTodo";
import styles from "./styles.module.css";
import { TodoI } from "../../types";

interface TodoListPropsI {
  list: TodoI[];
  listTitle: string;
  listId: number;
  onTitleEdit: (newName: string, id: number) => void;
  onDelete: (listId: number) => void;
}

export const TodoList: React.FC<TodoListPropsI> = ({
  list,
  listTitle,
  listId,
  onTitleEdit,
  onDelete,
}) => {
  const [todos, setTodos] = useState(list);
  const [titleName, setTitleName] = useState(listTitle);
  const [editListTitle, setEditListTitle] = useState(false);

  const showEditForm = () => setEditListTitle(true);

  const editTitleName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (titleName.trim()) {
      onTitleEdit(titleName, listId);
    }
    setEditListTitle(false);
  };

  const handleAddToDo = (title: string) => {
    setTodos([
      {
        title,
        completed: false,
        id: Date.now(),
      },
      ...todos,
    ]);
  };

  return (
    <div className={styles["todo-list"]}>
      <button
        className={styles["delete-list-btn"]}
        type="button"
        onClick={() => onDelete(listId)}
      >
        X
      </button>
      <div className={styles["list-title"]}>
        {!editListTitle && <h2 className={styles.cockerel}> {listTitle} </h2>}
        {editListTitle && (
          <form className={styles["edit-title-form"]} onSubmit={editTitleName}>
            <input
              type="text"
              className={styles["title-input"]}
              value={titleName}
              onChange={(event) => setTitleName(event.target.value)}
            />
            <button type="submit" className={styles["edit-title-btn"]}>
              S
            </button>
          </form>
        )}
        <button
          className={styles["edit-title-btn"]}
          type="button"
          onClick={showEditForm}
        >
          🐓
        </button>
      </div>
      <AddToDo onAdd={handleAddToDo} />
      <ToDoList todos={todos} setTodos={setTodos} listId={listId} />
    </div>
  );
};
