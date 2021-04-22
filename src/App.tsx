import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TodoListContainer } from './components/Todo';
import { TodoListI } from './types';
import { addList } from './redux/actions';
import { TodosStoreI } from './redux/store';
import {
  GlobalStyle,
  MainWrapper,
  StyledFooterWrapper,
  AddListButton,
  ListsWrapper,
} from './styled';

const App: React.FC<{
  todoLists: TodoListI[];
  addList: (newList: TodoListI) => void;
}> = ({ todoLists, addList }) => {
  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <StyledFooterWrapper color="pink">
          <AddListButton
            type="button"
            onClick={() =>
              addList({
                id: Date.now(),
                title: 'Todo List',
                items: [],
              })
            }
          >
            Add List
          </AddListButton>
        </StyledFooterWrapper>
        <ListsWrapper>
          {todoLists.map(({ id, title, items }) => (
            <TodoListContainer list={items} listTitle={title} listId={id} key={id} />
          ))}
        </ListsWrapper>
      </MainWrapper>
    </>
  );
};

const mapStateToProps = (store: TodosStoreI) => ({ todoLists: store.lists });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addList: (newList: TodoListI) => dispatch(addList(newList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
