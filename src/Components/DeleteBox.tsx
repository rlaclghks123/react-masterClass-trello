import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  left: 750px;
  width: 300px;
  height: 100px;
`;
const Area = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  svg {
    font-size: 20px;
    color: gray;
  }
`;

interface ITo {
  boardId: string;
}

function DeleteBox({ boardId }: ITo) {
  return (
    <>
      <Wrapper>
        <Droppable droppableId={boardId}>
          {(magic, snapshot) => (
            <Area ref={magic.innerRef} {...magic.droppableProps}>
              <span>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
}
export default DeleteBox;
