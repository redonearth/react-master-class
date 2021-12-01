import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px;
  border-radius: 5px;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

interface IDraggableCardProps {
  workflow: string;
  index: number;
}

function DraggableCard({ workflow, index }: IDraggableCardProps) {
  console.log(workflow, '가 렌더링 되었습니다.');
  return (
    <Draggable key={workflow} draggableId={workflow} index={index}>
      {(magic) => (
        <Card
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
