import React, { useState } from "react";
import { ToDoList } from "./List";
import { AddToDo } from "./AddTodo";
import styles from "./styles.module.css";


export const TodoList = ({ list, listTitle, listId, onTitleEdit, onDelete}) => {
  const [todos, setTodos] = useState(list);
  const [titleName, setTitleName] = useState(listTitle)
  const [editListTitle, setEditListTitle] = useState(false)

  const showEditForm = () => setEditListTitle(true)
  
  const editTitleName = (event) => {
    event.preventDefault();
    if (titleName.trim()) {
      onTitleEdit(titleName, listId)
    }
    setEditListTitle(false)
  }

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
      <button type="button" onClick={() => onDelete(listId)}>Delete List</button>
      <button type="button" onClick={showEditForm}>🐓</button>
      <AddToDo setTodos={setTodos} onAdd={handleAddToDo} />
      <ToDoList todos={todos} setTodos={setTodos} listId={listId}/>

      {editListTitle && (<form onSubmit={editTitleName}>
        <input type="text" value={titleName} onChange={(event) => setTitleName(event.target.value)}/>
        <button type="submit">S</button>
      </form>)}
    </div>
  );
};