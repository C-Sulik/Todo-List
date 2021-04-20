import { TodoListI, TodoI } from "../types";

export const todoListsActions = {
  ADD_TODO_LIST: "ADD_TODO_LIST",
  DELETE_TODO_LIST: "DELETE_TODO_LIST",
  EDIT_TITLE_NAME: "EDIT_TITLE_NAME",
  EDIT_TODO_LIST: "EDIT_TODO_LIST",
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
} as const;

export type TodoListsReducerAction = {
  type: keyof typeof todoListsActions;
  payload: {
    id?: number;
    list?: TodoListI;
    title?: string;
    items?: TodoI;
    listId?: number;
  };
};
