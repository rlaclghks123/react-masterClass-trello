import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<IArea>`
  border-radius: 5px;
  margin-bottom: 4px;
  padding: 10px;
  background-color: ${props =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${props =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface IArea {
  isDragging: boolean;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCard) {
  return (
    <Draggable draggableId={toDoId + ""} key={toDoId} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
