import { TodoListI } from '../types';

export const todosActions = {
  ADD_TODO_LIST: 'ADD_TODO_LIST',
  DELETE_TODO_LIST: 'DELETE_TODO_LIST',
  EDIT_TITLE_NAME: 'EDIT_TITLE_NAME',
  EDIT_TODO_LIST: 'EDIT_TODO_LIST',
  ADD_TODO: 'ADD_TODO',
  DELETE_TODOS: 'DELETE_TODO',
  TOGGLE_SELECT_TODO: 'TOGGLE_SELECT_TODO',
  UNSELECT_TODO: 'UNSELECT_TODO',
} as const;

export const deleteList = (id: number) => ({
  type: todosActions.DELETE_TODO_LIST,
  payload: { id },
});

export const addList = (newList: TodoListI) => ({
  type: todosActions.ADD_TODO_LIST,
  payload: { list: newList },
});

export const editTitleName = (newListTitle: string, id: number) => ({
  type: todosActions.EDIT_TODO_LIST,
  payload: { id, title: newListTitle },
});

export const addTodo = (listId: number, todoTitle: string) => ({
  type: todosActions.ADD_TODO,
  payload: { listId, title: todoTitle },
});

export const deleteTodos = (listId: number, todosId: number[]) => ({
  type: todosActions.DELETE_TODOS,
  payload: { todosId, listId },
});

export const toggleSelectTodo = (listId: number, todoId: number) => ({
  type: todosActions.TOGGLE_SELECT_TODO,
  payload: { todoId, listId },
});

export const unselectTodo = (listId: number, todoId: number) => ({
  type: todosActions.UNSELECT_TODO,
  payload: { todoId, listId },
});
