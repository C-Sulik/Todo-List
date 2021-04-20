import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 *{
  font-family: Roboto Condensed;
  transition-duration: 0.2s;
  margin:0;
  padding: 0;
  }`;

export const MainWrapper = styled.main`
  font-size: 16px;
  text-align: center;
  margin: 0 auto;
  max-width: 1320px;
`;

export const StyledFooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  background-color: ${({ color }) => color};
`;

export const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1px solid gray;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.25),
      -2px -2px 3px 0 rgba(255, 255, 255, 0.3);
  }
`;

export const AddListButton = styled(StyledButton)`
  min-width: 63px;
  min-height: 63px;
  background-color: rgba(0, 0, 0, 0.25);
`;

export const ListsWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const ListContainer = styled.div`
  max-width: 353px;
  margin: 20px;
`;
export const DeleteListBtn = styled(StyledButton)`
  margin-left: 300px;
  border: none;
  width: 34px;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EditTitleForm = styled.form`
  display: flex;
  align-items: center;
  min-height: 34px;
  width: 311px;
  word-break: break-word;
`;
