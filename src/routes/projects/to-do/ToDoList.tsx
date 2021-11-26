import React, { useState } from 'react';

function ToDoList() {
  const [toDo, setToDo] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={toDo}
          placeholder="할 일을 작성하세요."
        />
        <button>Add</button>
      </form>
      <div>{toDo}</div>
    </div>
  );
}

export default ToDoList;
