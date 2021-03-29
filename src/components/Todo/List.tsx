import React, { useState } from "react";
import { TodoItem } from "./Item";
import { Filter } from "./Filter";
import styles from "./styles.module.css";
import { TodoI } from "../../types";

interface TodoListI {
  todos: TodoI[];
  setTodos: (todos: TodoI[]) => void;
  listId: number;
}

export type CompletedFilterState = "all" | "completed" | "not completed";

export const TodoList: React.FC<TodoListI> = ({ todos, setTodos, listId }) => {
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [completedFilter, setCompletedFilter] = useState<CompletedFilterState>(
    "all"
  );

  const handleDeleteTodo = (id: number) => {
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

  const selectTodo = (id: number) => {
    if (selectedTodos.includes(id)) {
      setSelectedTodos(selectedTodos.filter((elem) => elem !== id));
    } else {
      setSelectedTodos([...selectedTodos, id]);
    }
  };

  const selectTodoClassName = (id: number): string => {
    let className = `${styles.todo}`;
    if (selectedTodos.includes(id))
      className = `${styles.todo} ${styles["selected-todo"]}`;
    return className;
  };

  const handleEditTodo = (id: number, payload: Partial<TodoI>) => {
    setTodos(
      todos.map((todo) => (id === todo.id ? { ...todo, ...payload } : todo))
    );
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterTodo = (todos: TodoI[]) => {
    switch (true) {
      case Boolean(search):
        return todos.filter(({ title }) =>
          title.toLowerCase().includes(search)
        );
      case completedFilter === "not completed":
        return todos.filter(({ completed }) => !completed);
      case completedFilter === "completed":
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Filter listId={listId} setCompletedFilter={setCompletedFilter} />
      <div>
        {selectedTodos.length > 0 && (
          <button
            className={styles["completed-todos-btn"]}
            type="button"
            onClick={handleCompletedTodos}
          >
            {`Complete ${selectedTodos.length}`}
          </button>
        )}
        <input
          type="search"
          onChange={onSearch}
          className={styles["search-todo"]}
        />
        {selectedTodos.length > 0 && (
          <button
            className={styles["delete-todos-btn"]}
            type="button"
            onClick={handleDeleteTodos}
          >
            {`Delete ${selectedTodos.length}`}
          </button>
        )}
      </div>
      <ul>
        {filterTodo(todos).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            className={selectTodoClassName(todo.id)}
            onSelect={selectTodo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};
