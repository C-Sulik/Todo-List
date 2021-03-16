import React from 'react';
import { ToDo } from "./components/Todo";
import "./App.css";
import { useState } from "react";

export default function App() {
  
  const todosMock = {
    id: 1,
    name: '🐓 Todo List 🐓',
    values: [
      {
        title: "Learn JS",
        completed: true,
        id: 1
      },
      {
        title: "Learn React",
        completed: false,
        id: 2
      },
      {
        title: "Learn Redux",
        completed: false,
        id: 3
      }
    ],
  }
  const [todoLists, setTodoLists] = useState([todosMock])

  const addList = () => {
    setTodoLists([...todoLists, {
      id: Date.now(),
      name: 'Todo List',
      values: []}])
  }


  return (
    <div className="App">
      <button type="button" onClick={addList}>Add List</button>
      {todoLists.map(({id, name, values}) => <ToDo list={values} listTitle={name} listId={id} key={id} />)}
    </div>
  );
}
