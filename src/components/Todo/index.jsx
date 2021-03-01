import React, { useState } from "react";
import { ToDoList } from "./List";
import { AddToDo } from "./AddTodo";

const todosMock = [
  {
    title: "Learn JS",
    completed: true,
    id: 1
  },
  {
    title: "Learn Reacr",
    completed: false,
    id: 2
  },
  {
    title: "Learn Redux",
    completed: false,
    id: 3
  }
];

export const ToDo = () => {
  const [todos, setTodos] = useState(todosMock);

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
      <AddToDo setTodos={setTodos} onAdd={handleAddToDo} />
      <ToDoList todos={todos} setTodos={setTodos} />
    </div>
  );
};