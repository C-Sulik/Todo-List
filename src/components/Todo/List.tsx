import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTodos, toggleSelectTodo, unselectTodo } from '../../redux/actions';
import { TodoItem } from './Item';
import { Filter } from './Filter';
import styles from './styles.module.css';
import { TodoI } from '../../types';
import { TodosStoreI } from '../../redux/store';

interface TodoListPropsI {
  todos: TodoI[];
  listId: number;
  storeSelectedTodos: Record<string, number[]>;
  deleteTodos: (listId: number, todosId: number[]) => void;
  setTodos: (todos: TodoI[]) => void;
}

const completedFilterState = {
  all: 'all',
  completed: 'completed',
  'not completed': 'not completed',
} as const;

export type CompletedFilterState = keyof typeof completedFilterState;

export const TodoListComponent: React.FC<TodoListPropsI> = ({
  todos,
  setTodos,
  listId,
  deleteTodos,
  storeSelectedTodos,
}) => {
  const [selectedTodos, setSelectedTodos] = useState<number[]>(storeSelectedTodos[listId] || []);
  const [search, setSearch] = useState<string>('');
  const [completedFilter, setCompletedFilter] = useState<CompletedFilterState>(
    completedFilterState.all,
  );

  const handleDeleteTodos = () => {
    setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  const handleCompletedTodos = () => {
    setTodos(
      todos.map((todo) => (selectedTodos.includes(todo.id) ? { ...todo, completed: true } : todo)),
    );
    setSelectedTodos([]);
  };

  const selectTodoClassName = (id: number): string => {
    let className = `${styles.todo}`;
    if (selectedTodos.includes(id)) className = `${styles.todo} ${styles['selected-todo']}`;
    return className;
  };

  const handleEditTodo = (id: number, payload: Partial<TodoI>) => {
    setTodos(todos.map((todo) => (id === todo.id ? { ...todo, ...payload } : todo)));
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterTodo = (todos: TodoI[]) => {
    switch (true) {
      case Boolean(search):
        return todos.filter(({ title }) => title.toLowerCase().includes(search));
      case completedFilter === completedFilterState['not completed']:
        return todos.filter(({ completed }) => !completed);
      case completedFilter === completedFilterState.completed:
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Filter listId={listId} setCompletedFilter={setCompletedFilter} />
      <div>
        {selectedTodos.length > 0 && (
          <button
            className={styles['completed-todos-btn']}
            type="button"
            onClick={handleCompletedTodos}
          >
            {`Complete ${selectedTodos.length}`}
          </button>
        )}
        <input type="search" onChange={onSearch} className={styles['search-todo']} />
        {selectedTodos.length > 0 && (
          <button className={styles['delete-todos-btn']} type="button" onClick={handleDeleteTodos}>
            {`Delete ${selectedTodos.length}`}
          </button>
        )}
      </div>
      <ul>
        {filterTodo(todos).map((todo) => (
          <TodoItem
            deleteTodos={deleteTodos}
            key={todo.id}
            todo={todo}
            className={selectTodoClassName(todo.id)}
            onEdit={handleEditTodo}
            listId={listId}
          />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (store: TodosStoreI) => ({
  storeSelectedTodos: store.selectedTodos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTodos: (listId: number, todosId: number[]) => dispatch(deleteTodos(listId, todosId)),
  toggleSelectTodo: (listId: number, todoId: number) => dispatch(toggleSelectTodo(listId, todoId)),
  unselectTodo: (listId: number, todoId: number) => dispatch(unselectTodo(listId, todoId)),
});

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);
