import { createStore, combineReducers } from 'redux';
import { todosReducer } from './reducers';
import { TodoListI } from '../types';

export const todosMock: TodoListI = {
  id: 1,
  title: '🐓 Todo List 🐓',
  items: [
    {
      title: 'Learn JS',
      completed: true,
      id: 1,
    },
    {
      title: 'Learn React',
      completed: false,
      id: 2,
    },
    {
      title: 'Learn Redux',
      completed: false,
      id: 3,
    },
  ],
};

export type TodosStoreI = { lists: TodoListI[]; selectedTodos: Record<string, number[]> };
// { [key: string]: number[] } === Record<string, number[]>
export const store = createStore(
  todosReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
