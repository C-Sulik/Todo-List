import React from "react";
import { TodoListContainer } from "./components/Todo";
import { useState } from "react";
import { TodoListI } from "./types";
import {
  GlobalStyle,
  MainWrapper,
  StyledFooterWrapper,
  AddListButton,
  ListsWrapper,
} from "./styled";

const todosMock: TodoListI = {
  id: 1,
  title: "🐓 Todo List 🐓",
  items: [
    {
      title: "Learn JS",
      completed: true,
      id: 1,
    },
    {
      title: "Learn React",
      completed: false,
      id: 2,
    },
    {
      title: "Learn Redux",
      completed: false,
      id: 3,
    },
  ],
};

export default function App() {
  const [todoLists, setTodoLists] = useState<TodoListI[]>([todosMock]);

  const addList = () => {
    setTodoLists([
      ...todoLists,
      {
        id: Date.now(),
        title: "Todo List",
        items: [],
      },
    ]);
  };

  const handleDeleteList = (listId: number) => {
    setTodoLists(todoLists.filter(({ id }) => id !== listId));
  };

  const handleEditListTitle = (newName: string, id: number) => {
    setTodoLists(
      todoLists.map((list) =>
        id === list.id ? { ...list, name: newName } : list
      )
    );
  };

  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <StyledFooterWrapper color="pink">
          <AddListButton type="button" onClick={addList}>
            Add List
          </AddListButton>
        </StyledFooterWrapper>
        <ListsWrapper>
          {todoLists.map(({ id, title, items }) => (
            <TodoListContainer
              onDelete={handleDeleteList}
              onTitleEdit={handleEditListTitle}
              list={items}
              listTitle={title}
              listId={id}
              key={id}
            />
          ))}
        </ListsWrapper>
      </MainWrapper>
    </>
  );
}
