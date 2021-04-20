import { Reducer } from "redux";
import { todosMock, TodoListsStoreI } from "./store";
import { todoListsActions, TodoListsReducerAction } from "./constants";
import { TodoListI } from "../types";

const {
  ADD_TODO_LIST,
  DELETE_TODO_LIST,
  EDIT_TODO_LIST,
  ADD_TODO,
  DELETE_TODO,
} = todoListsActions;

export const todoListsReducer: Reducer<
  TodoListsStoreI,
  TodoListsReducerAction
> = (todoLists = [todosMock], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO_LIST:
      return [...todoLists, payload.list as TodoListI];

    case DELETE_TODO_LIST:
      return todoLists.filter(({ id }) => id !== payload.id);
    // case EDIT_TITLE_NAME:
    //   return todoLists.map((list) => {
    //     return list.id === payload.id
    //       ? { ...list, title: payload.title as string }
    //       : list;
    //   });

    case EDIT_TODO_LIST:
      const { id, ...data } = payload;
      return todoLists.map((list) => {
        return list.id === payload.id
          ? {
              ...list,
              ...(data as { data: Omit<Partial<TodoListI>, "id"> }),
            }
          : list;
      });

    case ADD_TODO:
      return todoLists.map((list) => {
        list.items.unshift({
          title: payload.title as string,
          completed: false,
          id: Date.now(),
        });
        return list;
      });

    case DELETE_TODO:
      console.log("DELETE_TODO");
      return todoLists.map((list) => {
        if (list.id === payload.listId) {
          return {
            ...list,
            items: list.items.filter(({ id }) => payload.id !== id),
          };
        }
        return list;
      });

    default:
      return todoLists;
  }
};
