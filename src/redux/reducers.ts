import { Reducer } from 'redux';
import { todosMock, TodoListsStoreI } from './store';
import { todoListsActions } from './constants';
import { TodoListI } from '../types';

const { ADD_TODO_LIST, DELETE_TODO_LIST, EDIT_TODO_LIST, ADD_TODO, DELETE_TODO } = todoListsActions;

type Action<T, P> = { readonly type: T; readonly payload: P };

type AddTodoListAction = Action<typeof ADD_TODO_LIST, { list: TodoListI }>;
type DeleteTodoListAction = Action<typeof DELETE_TODO_LIST, { id: number }>;
type EditTodoListAction = Action<typeof EDIT_TODO_LIST, Partial<TodoListI>>;
type AddTodoAction = Action<typeof ADD_TODO, { title: string }>;
type DeleteTodoAction = Action<typeof DELETE_TODO, { listId: number; id: number }>;

type TodoListsReducerActions =
  | AddTodoListAction
  | DeleteTodoListAction
  | EditTodoListAction
  | AddTodoAction
  | DeleteTodoAction;

export const todoListsReducer: Reducer<TodoListsStoreI, TodoListsReducerActions> = (
  todoLists = [todosMock],
  action,
) => {
  switch (action.type) {
    case ADD_TODO_LIST:
      return [...todoLists, action.payload.list];

    case DELETE_TODO_LIST:
      return todoLists.filter(({ id }) => id !== action.payload.id);

    case EDIT_TODO_LIST:
      const { id, ...data } = action.payload;
      return todoLists.map((list) => {
        return list.id === action.payload.id
          ? {
              ...list,
              ...data,
            }
          : list;
      });

    case ADD_TODO:
      return todoLists.map((list) => {
        list.items.unshift({
          title: action.payload.title,
          completed: false,
          id: Date.now(),
        });
        return list;
      });

    case DELETE_TODO:
      return todoLists.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            items: list.items.filter(({ id }) => action.payload.id !== id),
          };
        }
        return list;
      });

    default:
      return todoLists;
  }
};
