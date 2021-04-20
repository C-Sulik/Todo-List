import { createStore } from "redux";
import { todoListsReducer } from "./reducers";
import { TodoListI } from "../types";

export const todosMock: TodoListI = {
  id: 1,
  title: "🐓 Todo List 🐓",
  items: [
    {
      title: "Learn JS",
      completed: true,
      id: 1,
    },
    {
      title: "Learn React",
      completed: false,
      id: 2,
    },
    {
      title: "Learn Redux",
      completed: false,
      id: 3,
    },
  ],
};

export type TodoListsStoreI = TodoListI[];

export const store = createStore(
  todoListsReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
