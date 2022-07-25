import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem("toDo");
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: string) => {
      const confirm = newValue.length === 0;
      confirm
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    DOING: [],
    DONE: [],
  },
  effects: [localStorageEffect("toDo")],
});
