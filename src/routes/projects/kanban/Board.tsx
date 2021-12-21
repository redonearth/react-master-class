import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IWorkflow, workflowState } from './atoms';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#b2b3b9'
      : props.isDraggingFromThis
      ? '#dfe6e9'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
  workflows: IWorkflow[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ workflows, boardId }: IBoardProps) {
  const setWorkflows = useSetRecoilState(workflowState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newWorkflow = {
      id: Date.now(),
      text: toDo,
    };
    setWorkflows((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newWorkflow],
      };
    });
    setValue('toDo', '');
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {workflows.map((workflow, index) => (
              <DraggableCard
                key={workflow.id}
                index={index}
                workflowId={workflow.id}
                workflowText={workflow.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
