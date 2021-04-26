import { Reducer } from 'redux';
import { todosMock, TodosStoreI } from './store';
import { todosActions } from './actions';
import { TodoListI } from '../types';

const {
  ADD_TODO_LIST,
  DELETE_TODO_LIST,
  EDIT_TODO_LIST,
  ADD_TODO,
  DELETE_TODOS,
  TOGGLE_SELECT_TODO,
  UNSELECT_TODOS,
  COMPLETE_TODOS,
} = todosActions;

type Action<T, P> = { readonly type: T; readonly payload: P };

type AddTodoListAction = Action<typeof ADD_TODO_LIST, { list: TodoListI }>;
type DeleteTodoListAction = Action<typeof DELETE_TODO_LIST, { id: number }>;
type EditTodoListAction = Action<typeof EDIT_TODO_LIST, Partial<TodoListI>>;
type AddTodoAction = Action<typeof ADD_TODO, { listId: number; title: string }>;
type DeleteTodosAction = Action<typeof DELETE_TODOS, { listId: number; todosId: number[] }>;
type SelectTodoAction = Action<typeof TOGGLE_SELECT_TODO, { listId: number; todoId: number }>;
type UnselectTodosAction = Action<typeof UNSELECT_TODOS, { listId: number; todosId: number[] }>;
type completeSelectedTodosActions = Action<
  typeof COMPLETE_TODOS,
  { listId: number; todosId: number[] }
>;

type TodosReducerActions =
  | AddTodoListAction
  | DeleteTodoListAction
  | EditTodoListAction
  | AddTodoAction
  | DeleteTodosAction
  | SelectTodoAction
  | UnselectTodosAction
  | completeSelectedTodosActions;

export const todosReducer: Reducer<TodosStoreI, TodosReducerActions> = (
  todos = { lists: [todosMock], selectedTodos: {} }, // TodoListI[] => {todoList: TodoListI[], selectedTodos: {[key: number]: number[]}}
  action,
) => {
  switch (action.type) {
    case ADD_TODO_LIST: {
      return { ...todos, lists: [...todos.lists, action.payload.list] };
    }

    case DELETE_TODO_LIST: {
      return { ...todos, lists: todos.lists.filter(({ id }) => id !== action.payload.id) };
    }

    case EDIT_TODO_LIST: {
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
    }

    case ADD_TODO: {
      const { listId, title } = action.payload;
      return {
        ...todos,
        lists: todos.lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              items: [{ title, completed: false, id: Date.now() }, ...list.items],
            };
          }
          return list;
        }),
      };
    }

    case DELETE_TODOS: {
      return {
        ...todos,
        lists: todos.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              items: list.items.filter(({ id }) => !action.payload.todosId.includes(id)),
            };
          }
          return list;
        }),
      };
    }

    case TOGGLE_SELECT_TODO: {
      const { listId, todoId } = action.payload;

      const currentSelectedTodos = todos.selectedTodos[listId] || [];
      const isTodoSelected = currentSelectedTodos.includes(todoId);
      const selectedTodos = isTodoSelected
        ? currentSelectedTodos.filter((id) => id !== todoId)
        : [...currentSelectedTodos, todoId];

      return {
        ...todos,
        selectedTodos: {
          ...todos.selectedTodos,
          [listId]: selectedTodos,
        },
      };
    }

    case UNSELECT_TODOS: {
      const { listId, todosId } = action.payload;

      return {
        ...todos,
        selectedTodos: {
          ...todos.selectedTodos,
          [listId]: todos.selectedTodos[listId].filter((id) => !todosId.includes(id)),
        },
      };
    }

    case COMPLETE_TODOS: {
      const { listId, todosId } = action.payload;
      return {
        ...todos,
        lists: todos.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  todosId.includes(item.id)
                    ? {
                        ...item,
                        completed: true,
                      }
                    : item,
                ),
              }
            : list,
        ),
      };
    }

    default:
      return todos;
  }
};
