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

interface IForm {
  email: string;
  lastName: string;
  firstName: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: '@gmail.com',
    },
  });
  const onValid = (data: IForm) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          {...register('email', {
            required: '이메일은 필수입니다.',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
              message: 'Gmail 계정만 허용됩니다.',
            },
          })}
          placeholder="이메일"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('lastName', { required: '성을 입력하세요.' })}
          placeholder="성"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register('firstName', { required: '이름을 입력하세요.' })}
          placeholder="이름"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register('username', {
            required: '사용자명은 필수입니다.',
            minLength: {
              value: 3,
              message: '길이가 짧습니다. 3글자 이상 입력해주세요.',
            },
          })}
          placeholder="사용자명"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register('password', {
            required: '패스워드를 입력하세요.',
            minLength: 8,
          })}
          placeholder="패스워드"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('passwordConfirm', {
            required: '패스워드를 한 번 더 입력하세요.',
            minLength: 8,
          })}
          placeholder="패스워드 확인"
        />
        <span>{errors?.passwordConfirm?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
