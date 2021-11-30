import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h1>할 일</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">해야 함</option>
        <option value="DOING">하는 중</option>
        <option value="DONE">완료</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
