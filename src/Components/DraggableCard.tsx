import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 4px;
  padding: 10px 10px;
  background-color: ${props => props.theme.cardColor};
`;

interface IDraggableCard {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCard) {
  return (
    <Draggable draggableId={toDo} key={toDo} index={index}>
      {magic => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
