import { TodoListI } from '../types';

export const todosActions = {
  ADD_TODO_LIST: 'ADD_TODO_LIST',
  DELETE_TODO_LIST: 'DELETE_TODO_LIST',
  EDIT_TITLE_NAME: 'EDIT_TITLE_NAME',
  EDIT_TODO_LIST: 'EDIT_TODO_LIST',
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SELECT_TODO: 'SELECT_TODO',
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

export const addTodo = (todoTitle: string) => ({
  type: todosActions.ADD_TODO,
  payload: { title: todoTitle },
});

export const deleteTodo = (id: number, listId: number) => ({
  type: todosActions.DELETE_TODO,
  payload: { id, listId },
});
// handleCompletedTodos

export const selectTodo = (id: number, listId: number) => ({
  type: todosActions.SELECT_TODO,
  payload: { id, listId },
});
