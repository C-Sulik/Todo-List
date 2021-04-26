import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { deleteList, editTitleName } from '../../redux/actions';
import { TodoList } from './List';
import { AddTodo } from './AddTodo';
import styles from './styles.module.css';
import { TodoI } from '../../types';
import styled from 'styled-components';

const Сockerel = styled.h2`
  display: inline-block;
  min-height: 34px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 311px;
  word-break: break-word;
`;

interface TodoListContainerI {
  list: TodoI[];
  listTitle: string;
  listId: number;
  deleteList: (id: number) => void;
  editTitleName: (titleName: string, listId: number) => void;
}

const TodoListComponent: React.FC<TodoListContainerI> = ({
  list,
  listTitle,
  listId,
  deleteList,
  editTitleName,
}) => {
  const [titleName, setTitleName] = useState(listTitle);
  const [editListTitle, setEditListTitle] = useState(false);

  const showEditForm = () => setEditListTitle(true);

  const handleEditTitleName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editTitleName(titleName, listId);
    setEditListTitle(false);
  };

  return (
    <div className={styles['todo-list']}>
      <button
        className={styles['delete-list-btn']}
        type="button"
        onClick={() => deleteList(listId)}
      >
        X
      </button>
      <div className={styles['list-title']}>
        {!editListTitle && <Сockerel> {listTitle} </Сockerel>}
        {editListTitle && (
          <form className={styles['edit-title-form']} onSubmit={handleEditTitleName}>
            <input
              type="text"
              className={styles['title-input']}
              value={titleName}
              onChange={(event) => setTitleName(event.target.value)}
            />
            <button type="submit" className={styles['edit-title-btn']}>
              S
            </button>
          </form>
        )}
        <button className={styles['edit-title-btn']} type="button" onClick={showEditForm}>
          🐓
        </button>
      </div>
      <AddTodo listId={listId} />
      <TodoList todos={list} listId={listId} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteList: (listId: number) => dispatch(deleteList(listId)),
  editTitleName: (titleName: string, listId: number) => dispatch(editTitleName(titleName, listId)),
});

export const TodoListContainer = connect(null, mapDispatchToProps)(TodoListComponent);
