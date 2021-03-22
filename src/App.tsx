import React from 'react';
import { TodoList } from "./components/Todo";
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
      values: []}
    ])
  }

  const handleDeleteList = (listId) => {
    setTodoLists(todoLists.filter(({id}) => id !== listId));
  }

  const handleEditListTitle = (newName, id) => {
    setTodoLists(todoLists.map((list) => {
      if (id === list.id) {
        list.name = newName;
      }
      return list;
    }))
  };
  
  return (
    <div className="App">
      <button type="button" onClick={addList}>Add List</button>
      {todoLists.map(({id, name, values}) => <TodoList onDelete={handleDeleteList} onTitleEdit={handleEditListTitle} list={values} listTitle={name} listId={id} key={id} />)}
    </div>
  );
}
