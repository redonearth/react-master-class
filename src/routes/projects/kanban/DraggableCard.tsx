import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  border-radius: 5px;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  background-color: ${(props) =>
    props.isDragging ? '#7efff5' : props.theme.cardBgColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 25px rgba(0, 0, 0, 0.4)' : 'none'};
`;

interface IDraggableCardProps {
  workflow: string;
  index: number;
}

function DraggableCard({ workflow, index }: IDraggableCardProps) {
  console.log(workflow, '가 렌더링 되었습니다.');
  return (
    <Draggable key={workflow} draggableId={workflow} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {workflow}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
