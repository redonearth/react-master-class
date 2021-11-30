import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Categories, categoryState, toDoSelector } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const ToDos = styled.ul`
  margin-top: 12px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  return (
    <Container>
      <Title>할 일</Title>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>해야 함</option>
        <option value={Categories.DOING}>하는 중</option>
        <option value={Categories.DONE}>완료</option>
      </select>
      <CreateToDo />
      <ToDos>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDos>
    </Container>
  );
}

export default ToDoList;
