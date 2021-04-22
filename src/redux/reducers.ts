import { Reducer } from 'redux';
import { todosMock, TodosStoreI } from './store';
import { todosActions } from './actions';
import { TodoListI } from '../types';

const {
  ADD_TODO_LIST,
  DELETE_TODO_LIST,
  EDIT_TODO_LIST,
  ADD_TODO,
  DELETE_TODO,
  SELECT_TODO,
} = todosActions;

type Action<T, P> = { readonly type: T; readonly payload: P };

type AddTodoListAction = Action<typeof ADD_TODO_LIST, { list: TodoListI }>;
type DeleteTodoListAction = Action<typeof DELETE_TODO_LIST, { id: number }>;
type EditTodoListAction = Action<typeof EDIT_TODO_LIST, Partial<TodoListI>>;
type AddTodoAction = Action<typeof ADD_TODO, { title: string }>;
type DeleteTodoAction = Action<typeof DELETE_TODO, { listId: number; id: number }>;
type SelectTodoAction = Action<typeof SELECT_TODO, { id: number }>;

type TodosReducerActions =
  | AddTodoListAction
  | DeleteTodoListAction
  | EditTodoListAction
  | AddTodoAction
  | DeleteTodoAction
  | SelectTodoAction;

export const todosReducer: Reducer<TodosStoreI, TodosReducerActions> = (
  todos = { lists: [todosMock], selectedTodos: {} }, // TodoListI[] => {todoList: TodoListI[], selectedTodos: {[key: number]: number[]}}
  action,
) => {
  switch (action.type) {
    case ADD_TODO_LIST:
      return { ...todos, lists: [...todos.lists, action.payload.list] };

    case DELETE_TODO_LIST:
      return { ...todos, lists: todos.lists.filter(({ id }) => id !== action.payload.id) };

    case EDIT_TODO_LIST:
      const { id, ...data } = action.payload;
      return {
        ...todos,
        lists: todos.lists.map((list) => {
          return list.id === action.payload.id
            ? {
                ...list,
                ...data,
              }
            : list;
        }),
      };

    case ADD_TODO:
      return {
        ...todos,
        lists: todos.lists.map((list) => {
          list.items.unshift({
            title: action.payload.title,
            completed: false,
            id: Date.now(),
          });
          return list;
        }),
      };

    case DELETE_TODO:
      return {
        ...todos,
        lists: todos.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              items: list.items.filter(({ id }) => action.payload.id !== id),
            };
          }
          return list;
        }),
      };

    // case SELECT_TODO:
    //   return {
    //     ...todos,
    //     selectedTodos: {listId}
    //   };

    default:
      return todos;
  }
};
