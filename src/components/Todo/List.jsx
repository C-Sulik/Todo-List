import React, { useState } from "react";
import { ToDoItem } from "./Item";
import { Filter } from "./Filter";
import styles from "./styles.module.css";

export function ToDoList({ todos, setTodos }) {
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [completedFilter, setCompletedFilter] = useState(null);

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setSelectedTodos(selectedTodos.filter((todoId) => todoId !== id));
  };

  const handleDeleteTodos = () => {
    setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  const handleCompletedTodos = () => {
    setTodos(
      todos.map((todo) =>
        selectedTodos.includes(todo.id) ? { ...todo, completed: true } : todo
      )
    );
    setSelectedTodos([]);
  };

  const selectTodo = (id) => {
    if (selectedTodos.includes(id)) {
      setSelectedTodos(selectedTodos.filter((elem) => elem !== id));
    } else {
      setSelectedTodos([...selectedTodos, id]);
    }
  };

  const selectTodoClassName = (id) => {
    let className = `${styles.todo}`;
    if (selectedTodos.includes(id))
      className = `${styles.todo} ${styles["selected-todo"]}`;
    return className;
  };

  const handleEditTodo = (id, payload) => {
    setTodos(
      todos.map((todo) => (id === todo.id ? { ...todo, ...payload } : todo))
    );
  };

  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  const filterTodo = (todos) => {
    switch (true) {
      case Boolean(search):
        return todos.filter(({ title }) =>
          title.toLowerCase().includes(search)
        );
      case completedFilter === false:
        return todos.filter(({ completed }) => !completed);
      case completedFilter === true:
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Filter
        completedFilter={completedFilter}
        setCompletedFilter={setCompletedFilter}
      />
      <input
        type="search"
        onChange={onSearch}
        className={styles["search-todo"]}
      />
      <ul>
        {filterTodo(todos).map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            className={selectTodoClassName(todo.id)}
            onSelect={selectTodo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
      {selectedTodos.length > 0 && (
        <>
          <button
            className={styles["completed-todos-btn"]}
            type="button"
            onClick={handleCompletedTodos}
          >
            {`Complete ${selectedTodos.length}`}
          </button>
          <button
            className={styles["delete-todos-btn"]}
            type="button"
            onClick={handleDeleteTodos}
          >
            {`Delete ${selectedTodos.length}`}
          </button>
        </>
      )}
    </div>
  );
}
