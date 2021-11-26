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
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          {...register('email', { required: '이메일은 필수입니다.' })}
          placeholder="이메일"
        />
        <input {...register('lastName', { required: true })} placeholder="성" />
        <input
          {...register('firstName', { required: true })}
          placeholder="이름"
        />
        <input
          {...register('username', {
            required: true,
            minLength: {
              value: 3,
              message: '길이가 짧습니다. 3글자 이상 입력해주세요.',
            },
          })}
          placeholder="표시할 이름"
        />
        <input
          {...register('password', { required: true, minLength: 8 })}
          placeholder="패스워드"
        />
        <input
          {...register('passwordConfirm', { required: true, minLength: 8 })}
          placeholder="패스워드 확인"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
