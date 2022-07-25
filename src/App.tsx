import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import DeleteBox from "./Components/DeleteBox";

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

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setToDos(allToDos => {
        const copyBoard = [...allToDos[source.droppableId]];
        const copyObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination?.index, 0, copyObj);
        return { ...allToDos, [source.droppableId]: copyBoard };
      });
    }

    if (source.droppableId !== destination?.droppableId) {
      if (destination.droppableId === "delete") {
        setToDos(allToDos => {
          const sourceBoard = [...allToDos[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return {
            ...allToDos,
            [source.droppableId]: sourceBoard,
          };
        });
      } else {
        setToDos(allToDos => {
          const sourceBoard = [...allToDos[source.droppableId]];
          const copyObj = sourceBoard[source.index];
          const destinationBoard = [...allToDos[destination.droppableId]];

          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, copyObj);

          return {
            ...allToDos,
            [source.droppableId]: sourceBoard,
            [destination?.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => (
            <>
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
              <DeleteBox boardId="delete" />
            </>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
export default App;
