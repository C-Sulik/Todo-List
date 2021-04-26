import React from 'react';
import { Title } from './Title';
import styles from './styles.module.css';
import { TodoI } from '../../types';

interface TodoItemPropsI {
  todo: TodoI;
  listId: number;
  className: string;
  editTodos: (listId: number, todosId: number[], todoPayload: Partial<TodoI>) => void;
  deleteTodos: (listId: number, todosId: number[]) => void;
  toggleSelectTodo: (listId: number, todoId: number) => void;
  unselectTodos: (listId: number, todoId: number[]) => void;
}

export const TodoItem: React.FC<TodoItemPropsI> = ({
  listId,
  todo,
  editTodos,
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
    editTodos(listId, [todo.id], { completed: !todo.completed });
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
      <Title todo={todo} listId={listId} editTodos={editTodos} />
      <button className={styles['del-btn']} type="button" onClick={handleDeleteTodo}>
        X
      </button>
    </div>
  );
};
