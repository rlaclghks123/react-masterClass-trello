import { atom } from "recoil";

export const toDoState = atom({
    key:"toDo",
    default: ["1", "2", "3", "4", "5"],
})