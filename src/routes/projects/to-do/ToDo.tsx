import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from './atoms';

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo: IToDo = { id, text, category: name as IToDo['category'] };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && (
        <button name="DOING" onClick={onClick}>
          하는 중
        </button>
      )}
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onClick}>
          해야 함
        </button>
      )}
      {category !== 'DONE' && (
        <button name="DONE" onClick={onClick}>
          완료
        </button>
      )}
    </li>
  );
}

export default ToDo;
