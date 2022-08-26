import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  position: absolute;
  top: 200px;
  input {
    height: 30px;
    width: 200px;
    border-style: none;
    border-radius: 15px;
    border: solid ${props => props.theme.boardColor} 2px;
    background-color: transparent;
    padding: 0px 10px;
    color: ${props => props.theme.boardColor};
    ::placeholder {
      color: ${props => props.theme.boardColor};
      text-align: center;
    }
    :focus {
      outline: none;
    }
  }
`;

function CreateBoard() {
  const [input, setInput] = useState("");
  const setTodos = useSetRecoilState(toDoState);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos(allBoards => {
      const boardCopy = { ...allBoards };
      boardCopy[input] = [];
      return boardCopy;
    });
    setInput("");
  };
  const onChange = (event: FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };
  return (
    <Form onSubmit={onSubmit}>
      <input value={input} onChange={onChange} placeholder="add board" />
    </Form>
  );
}

export default CreateBoard;
