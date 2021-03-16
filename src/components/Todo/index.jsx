import React, { useState } from "react";
import { ToDoList } from "./List";
import { AddToDo } from "./AddTodo";
import styles from "./styles.module.css";


export const ToDo = ({ list, listTitle, listId}) => {
  const [todos, setTodos] = useState(list);

  const handleAddToDo = (title) => {
    setTodos([
      {
        title,
        completed: false,
        id: Date.now()
      },
      ...todos
    ]);
  };

  return (
    <div>
      <h2 className={styles.cockerel}> {listTitle} </h2>
      <AddToDo setTodos={setTodos} onAdd={handleAddToDo} />
      <ToDoList todos={todos} setTodos={setTodos} listId={listId}/>
    </div>
  );
};