import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { workflowState } from './atoms';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3fr);
  width: 100%;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;

function Kanban() {
  const [workflows, setWorkflows] = useRecoilState(workflowState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setWorkflows((oldWorkflows) => {
      const workflowsCopy = [...oldWorkflows];
      workflowsCopy.splice(source.index, 1);
      workflowsCopy.splice(destination?.index, 0, draggableId);
      return workflowsCopy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {workflows.map((workflow, index) => (
                  <DraggableCard
                    key={workflow}
                    index={index}
                    workflow={workflow}
                  />
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default Kanban;
