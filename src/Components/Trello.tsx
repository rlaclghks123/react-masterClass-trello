import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import CreateBoard from "./CreateBoard";
import TrashCan from "./TrashCan";

const Header = styled.div`
  height: 100px;
  margin-top: 40px;
  font-weight: 800;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const Logo = styled.div`
  width: 100px;
  position: absolute;
  left: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
      <Header>
        <Logo>Chirello</Logo>
        <CreateBoard />
      </Header>
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
