import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TrashCanWrapper = styled.div<ITrashCanWrapperProps>`
  position: fixed;
  right: 48%;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  transform: ${props => (props.isDraggingOver ? "scale(1.2)" : "none")};
  svg {
    path {
      fill: ${props => props.theme.bgColor};
    }
  }
`;

interface ITrashCanWrapperProps {
  isDraggingOver: boolean;
}

function TrashCan() {
  return (
    <Droppable droppableId="trashcan">
      {(provided, snapshot) => (
        <>
          <TrashCanWrapper
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
            <span style={{ display: "none" }}>{provided.placeholder}</span>
          </TrashCanWrapper>
        </>
      )}
    </Droppable>
  );
}

export default TrashCan;
