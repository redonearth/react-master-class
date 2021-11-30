import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, IToDo, toDoState } from './atoms';
import { Button } from './styled';

const ToDoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: white;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const ToDoText = styled.span`
  font-size: 1.2rem;
`;

const ToDoButtons = styled.div`
  display: flex;
`;
const ToDoBtn = styled(Button)`
  color: white;
  background: #0984e3;
`;
const DoingBtn = styled(Button)`
  color: white;
  background: #ff9f43;
`;
const DoneBtn = styled(Button)`
  color: white;
  background: #10ac84;
`;
const DeleteBtn = styled(Button)`
  color: white;
  background: red;
`;

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo: IToDo = { id, text, category: name as IToDo['category'] };
      if (name === 'DELETE') {
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      } else {
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
    });
  };
  return (
    <ToDoItem>
      <ToDoText>{text}</ToDoText>
      <ToDoButtons>
        {category !== Categories.TO_DO && (
          <ToDoBtn name={Categories.TO_DO} onClick={onClick}>
            해야 함
          </ToDoBtn>
        )}
        {category !== Categories.DOING && (
          <DoingBtn name={Categories.DOING} onClick={onClick}>
            하는 중
          </DoingBtn>
        )}
        {category !== Categories.DONE && (
          <DoneBtn name={Categories.DONE} onClick={onClick}>
            완료
          </DoneBtn>
        )}
        <DeleteBtn name="DELETE" onClick={onClick}>
          삭제
        </DeleteBtn>
      </ToDoButtons>
    </ToDoItem>
  );
}

export default ToDo;
