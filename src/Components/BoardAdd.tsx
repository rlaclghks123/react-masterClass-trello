import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  background-color: tan;
`;

function BoardAdd() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();

  const onValid = ({ toDo }: any) => {
    setToDos(allToDos => {
      return {
        ...allToDos,
        [toDo]: [],
      };
    });

    setValue("toDo", "");
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            placeholder="Write Board"
            {...register("toDo", { required: true })}
          ></input>
        </form>
      </Box>
    </>
  );
}

export default BoardAdd;
