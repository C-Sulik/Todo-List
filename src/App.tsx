import React from 'react';
import { ToDo } from "./components/Todo";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1>Todo List 🐓</h1>
      <ToDo />
    </div>
  );
}
