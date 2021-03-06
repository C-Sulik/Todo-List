import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTodos, toggleSelectTodo, unselectTodos, editTodos } from '../../redux/actions';
import { TodoItem } from './Item';
import { Filter } from './Filter';
import styles from './styles.module.css';
import { TodoI } from '../../types';
import { TodosStoreI } from '../../redux/store';

interface TodoListOwnPropsI {
  todos: TodoI[];
  listId: number;
}

interface TodoListConnectedPropsI {
  selectedTodos: number[];
  deleteTodos: (listId: number, todosId: number[]) => void;
  toggleSelectTodo: (listId: number, todoId: number) => void;
  unselectTodos: (listId: number, todosId: number[]) => void;
  editTodos: (listId: number, todosId: number[], todoPayload: Partial<TodoI>) => void;
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
  selectedTodos,
  deleteTodos,
  toggleSelectTodo,
  unselectTodos,
  editTodos,
}) => {
  const [search, setSearch] = useState<string>('');
  const [completedFilter, setCompletedFilter] = useState<CompletedFilterState>(
    completedFilterState.all,
  );

  const handleDeleteTodos = () => {
    deleteTodos(listId, selectedTodos);
    unselectTodos(listId, selectedTodos);
  };

  const handleCompletedTodos = () => {
    editTodos(listId, selectedTodos, { completed: true });
    unselectTodos(listId, selectedTodos);
  };

  const selectTodoClassName = (id: number): string => {
    let className = `${styles.todo}`;
    if (selectedTodos && selectedTodos.includes(id))
      className = `${styles.todo} ${styles['selected-todo']}`;
    return className;
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
        {selectedTodos && selectedTodos.length > 0 && (
          <button
            className={styles['completed-todos-btn']}
            type="button"
            onClick={handleCompletedTodos}
          >
            {`Complete ${selectedTodos.length}`}
          </button>
        )}
        <input type="search" onChange={onSearch} className={styles['search-todo']} />
        {selectedTodos && selectedTodos.length > 0 && (
          <button className={styles['delete-todos-btn']} type="button" onClick={handleDeleteTodos}>
            {`Delete ${selectedTodos.length}`}
          </button>
        )}
      </div>
      <ul>
        {filterTodo(todos).map((todo) => (
          <TodoItem
            key={todo.id}
            listId={listId}
            todo={todo}
            deleteTodos={deleteTodos}
            unselectTodos={unselectTodos}
            editTodos={editTodos}
            toggleSelectTodo={toggleSelectTodo}
            className={selectTodoClassName(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (store: TodosStoreI, ownProps: TodoListOwnPropsI) => ({
  selectedTodos: store.selectedTodos[ownProps.listId] || [],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTodos: (listId: number, todosId: number[]) => dispatch(deleteTodos(listId, todosId)),
  toggleSelectTodo: (listId: number, todoId: number) => dispatch(toggleSelectTodo(listId, todoId)),
  unselectTodos: (listId: number, todosId: number[]) => dispatch(unselectTodos(listId, todosId)),
  editTodos: (listId: number, todosId: number[], todoPayload: Partial<TodoI>) =>
    dispatch(editTodos(listId, todosId, todoPayload)),
});

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);
