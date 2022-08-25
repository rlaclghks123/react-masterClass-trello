import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  padding-top: 10px;
  width: 200px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Area = styled.div<IArea>`
  flex-grow: 1;
  background-color: ${props =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.5s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 13px;
    border: none;
    background-color: white;
    width: 80%;
    padding: 5px;
    border-radius: 5px;
    margin: 0 auto;
    ::placeholder {
      text-align: center;
    }
  }
`;

interface IBoard {
  toDos: ITodo[];
  boardId: string;
}

interface IArea {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoard) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                toDoId={toDo.id}
                index={index}
                key={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
