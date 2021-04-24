import React, { useState } from 'react';
import styles from './styles.module.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';

interface AddTodoPropsI {
  addTodo: (listId: number, title: string) => void;
  listId: number;
}
const AddTodoComponent: React.FC<AddTodoPropsI> = ({ listId, addTodo }) => {
  const [title, setTitle] = useState('');

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim()) addTodo(listId, title);
    setTitle('');
  };

  return (
    <form className={styles['add-form']} onSubmit={handleAddTodo}>
      <input
        className={styles['form-input']}
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button type="submit" className={styles['form-submit']}>
        +
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTodo: (listId: number, todoTitle: string) => dispatch(addTodo(listId, todoTitle)),
});

export const AddTodo = connect(null, mapDispatchToProps)(AddTodoComponent);
