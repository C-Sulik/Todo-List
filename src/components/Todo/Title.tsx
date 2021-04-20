import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { TodoI } from '../../types';

interface TitleEditorPropsI {
  todo: TodoI;
  isEdit: boolean;
  onEdit: (id: number, payload: Partial<TodoI>) => void;
  setIsEdit: (value: React.SetStateAction<boolean>) => void;
}

interface TitlePropsI {
  todo: TodoI;
  onEdit: (id: number, payload: Partial<TodoI>) => void;
}

const TitleEditor: React.FC<TitleEditorPropsI> = ({ todo, isEdit, onEdit, setIsEdit }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const titleEditInputRef = useRef<HTMLInputElement>(null);

  const submitNewTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTitle.trim()) onEdit(todo.id, { title: newTitle });
    setIsEdit(false);
  };

  useEffect(() => {
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    if (isEdit && titleEditInputRef?.current) titleEditInputRef.current.focus();
  }, [isEdit]);

  return (
    <form className={styles['edit-form']} onSubmit={submitNewTitle}>
      <input
        ref={titleEditInputRef}
        type="text"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        className={styles['edit-input']}
      />
      <button className={styles['edit-btn']} type="submit">
        S
      </button>
    </form>
  );
};

export const Title: React.FC<TitlePropsI> = ({ onEdit, todo }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <TitleEditor todo={todo} isEdit={isEdit} onEdit={onEdit} setIsEdit={setIsEdit} />
  ) : (
    <>
      <p className={styles['todo-text']}>{todo.title}</p>
      <button className={styles['edit-btn']} type="button" onClick={() => setIsEdit(true)}>
        E
      </button>
    </>
  );
};
