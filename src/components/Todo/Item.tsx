import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Title } from './Title';
import styles from './styles.module.css';
import { TodoI } from '../../types';
import { toggleSelectTodo } from '../../redux/actions';

interface TodoItemPropsI {
  todo: TodoI;
  className: string;
  listId: number;
  onEdit: (id: number, payload: Partial<TodoI>) => void;
  deleteTodos: (listId: number, todosId: number[]) => void;
  toggleSelectTodo: (listId: number, todoId: number) => void;
  unselectTodos: (listId: number, todoId: number[]) => void;
}

export const TodoItemComponent: React.FC<TodoItemPropsI> = ({
  listId,
  todo,
  onEdit,
  deleteTodos,
  toggleSelectTodo,
  unselectTodos,
  className,
}) => {
  const handleDeleteTodo = () => {
    deleteTodos(listId, [todo.id]);
    unselectTodos(listId, [todo.id]);
  };

  const toggleTodoCompleted = () => {
    onEdit(todo.id, { completed: !todo.completed });
  };

  const handleSelectTodo = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      toggleSelectTodo(listId, todo.id);
    }
  };

  return (
    <div className={className} onClick={handleSelectTodo}>
      <input
        className={styles['todo-checkbox']}
        type="checkbox"
        onChange={toggleTodoCompleted}
        checked={todo.completed}
      />
      <Title todo={todo} onEdit={onEdit} />
      <button className={styles['del-btn']} type="button" onClick={handleDeleteTodo}>
        X
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleSelectTodo: (listId: number, todoId: number) => dispatch(toggleSelectTodo(listId, todoId)),
});

export const TodoItem = connect(null, mapDispatchToProps)(TodoItemComponent);
