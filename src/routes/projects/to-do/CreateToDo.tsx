import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from './atoms';
import { Button } from './styled';

interface IForm {
  toDo: string;
}

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  margin-right: 12px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  font-size: 1rem;
`;

const AddBtn = styled(Button)`
  color: white;
  background: #4b4b4b;
`;

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
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register('toDo', {
          required: '할 일을 작성하세요.',
        })}
        placeholder="할 일을 작성하세요."
      />
      <AddBtn>추가</AddBtn>
    </Form>
  );
}

export default CreateToDo;
