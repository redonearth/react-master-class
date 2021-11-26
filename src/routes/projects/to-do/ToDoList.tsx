import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           onChange={onChange}
//           value={toDo}
//           placeholder="할 일을 작성하세요."
//         />
//         <button>Add</button>
//       </form>
//       <div>{toDo}</div>
//     </div>
//   );
// }

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <input {...register('email')} placeholder="이메일" />
        <input {...register('lastName')} placeholder="성" />
        <input {...register('firstName')} placeholder="이름" />
        <input {...register('username')} placeholder="표시할 이름" />
        <input {...register('password')} placeholder="패스워드" />
        <input {...register('passwordConfirm')} placeholder="패스워드 확인" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
