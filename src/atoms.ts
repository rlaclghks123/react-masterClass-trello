import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["b", "a"],
    DOING: ["c", "d", "e"],
    DONE: ["f"],
  },
  effects_UNSTABLE: [persistAtom],
});
