import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import TrashCan from "./TrashCan";

const Wrapper = styled.div`
  display: flex;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

function Trello() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setToDos(allToDos => {
        const copyBoard = [...allToDos[source.droppableId]];
        const taskObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination?.index, 0, taskObj);
        return { ...allToDos, [source.droppableId]: copyBoard };
      });
    } else if (destination.droppableId === "trashcan") {
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    } else if (source.droppableId !== destination?.droppableId) {
      setToDos(allToDos => {
        const sourceBoard = [...allToDos[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allToDos[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);

        return {
          ...allToDos,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default Trello;
