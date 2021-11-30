import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from './atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      {
        id: Date.now(),
        text: toDo,
        category,
      },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: '할 일을 작성하세요.',
        })}
        placeholder="할 일을 작성하세요."
      />
      <button>추가</button>
    </form>
  );
}

export default CreateToDo;
