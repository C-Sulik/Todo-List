import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTodos, toggleSelectTodo, unselectTodos } from '../../redux/actions';
import { TodoItem } from './Item';
import { Filter } from './Filter';
import styles from './styles.module.css';
import { TodoI } from '../../types';
import { TodosStoreI } from '../../redux/store';

interface TodoListOwnPropsI {
  todos: TodoI[];
  listId: number;
  setTodos: (todos: TodoI[]) => void;
}

interface TodoListConnectedPropsI {
  storeSelectedTodos: number[];
  deleteTodos: (listId: number, todosId: number[]) => void;
  unselectTodos: (listId: number, todosId: number[]) => void;
}

const completedFilterState = {
  all: 'all',
  completed: 'completed',
  'not completed': 'not completed',
} as const;

export type CompletedFilterState = keyof typeof completedFilterState;

export const TodoListComponent: React.FC<TodoListOwnPropsI & TodoListConnectedPropsI> = ({
  todos,
  listId,
  storeSelectedTodos,
  setTodos,
  deleteTodos,
  unselectTodos,
}) => {
  const [selectedTodos, setSelectedTodos] = useState<number[]>(storeSelectedTodos);
  const [search, setSearch] = useState<string>('');
  const [completedFilter, setCompletedFilter] = useState<CompletedFilterState>(
    completedFilterState.all,
  );

  const handleDeleteTodos = () => {
    deleteTodos(listId, storeSelectedTodos);
    unselectTodos(listId, storeSelectedTodos);
  };

  const handleCompletedTodos = () => {
    setTodos(
      todos.map((todo) => (selectedTodos.includes(todo.id) ? { ...todo, completed: true } : todo)),
    );
    setSelectedTodos([]);
  };

  const selectTodoClassName = (id: number): string => {
    let className = `${styles.todo}`;
    if (storeSelectedTodos && storeSelectedTodos.includes(id))
      className = `${styles.todo} ${styles['selected-todo']}`;
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
        {storeSelectedTodos && storeSelectedTodos.length > 0 && (
          <button
            className={styles['completed-todos-btn']}
            type="button"
            onClick={handleCompletedTodos}
          >
            {`Complete ${storeSelectedTodos.length}`}
          </button>
        )}
        <input type="search" onChange={onSearch} className={styles['search-todo']} />
        {storeSelectedTodos && storeSelectedTodos.length > 0 && (
          <button className={styles['delete-todos-btn']} type="button" onClick={handleDeleteTodos}>
            {`Delete ${storeSelectedTodos.length}`}
          </button>
        )}
      </div>
      <ul>
        {filterTodo(todos).map((todo) => (
          <TodoItem
            deleteTodos={deleteTodos}
            unselectTodos={unselectTodos}
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

const mapStateToProps = (store: TodosStoreI, ownProps: TodoListOwnPropsI) => ({
  storeSelectedTodos: store.selectedTodos[ownProps.listId] || [],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTodos: (listId: number, todosId: number[]) => dispatch(deleteTodos(listId, todosId)),
  toggleSelectTodo: (listId: number, todoId: number) => dispatch(toggleSelectTodo(listId, todoId)),
  unselectTodos: (listId: number, todosId: number[]) => dispatch(unselectTodos(listId, todosId)),
});

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);
