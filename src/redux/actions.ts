import { todoListsActions } from './constants';
import { TodoListI } from '../types';

export const deleteList = (id: number) => ({
  type: todoListsActions.DELETE_TODO_LIST,
  payload: { id },
});

export const addList = (newList: TodoListI) => ({
  type: todoListsActions.ADD_TODO_LIST,
  payload: { list: newList },
});

export const editTitleName = (newListTitle: string, id: number) => ({
  type: todoListsActions.EDIT_TODO_LIST,
  payload: { id, title: newListTitle },
});

export const addTodo = (todoTitle: string) => ({
  type: todoListsActions.ADD_TODO,
  payload: { title: todoTitle },
});

export const deleteTodo = (id: number, listId: number) => ({
  type: todoListsActions.DELETE_TODO,
  payload: { id, listId },
});
// handleCompletedTodos
