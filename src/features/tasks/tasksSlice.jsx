import { createSlice, nanoid } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = [
  {
    id: nanoid(),
    name: "exemple",
    status: "En cours",
    creationDate: moment().format("L"),
    modificationDate: "-",
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(payload) {
        return {
          payload: {
            id: nanoid(),
            name: payload.taskName,
            status: payload.taskStatus,
            creationDate: moment().format("L"),
            modificationDate: "-",
          },
        };
      },
    },
    taskEdited: {
      reducer(state, action) {
        const task = state.find((task) => task.id === action.payload.id);
        task.name = action.payload.name;
        task.status = action.payload.status;
        task.modificationDate = action.payload.modificationDate;
      },
      prepare(payload) {
        return {
          payload: {
            id: payload.taskId,
            name: payload.newTaskName,
            status: payload.newTaskStatus,
            modificationDate: moment().format("L"),
          },
        };
      },
    },
    taskDeleted(state, action) {
      const indexToDelete = state
        .map((task) => task.id)
        .indexOf(action.payload);
      state.splice(indexToDelete, 1);
    },
    taskDeletedAll(state) {
      state.splice(0, state.length);
    },
    taskDeletedCompleted(state) {
      return state.filter((task) => task.status !== "Terminé");
    },
    taskDeletedSelected(state, action) {
      return state.filter(
        (task) => action.payload[state.indexOf(task)] !== true
      );
    },
  },
});

export const {
  taskAdded,
  taskEdited,
  taskDeleted,
  taskDeletedAll,
  taskDeletedCompleted,
  taskDeletedSelected,
} = tasksSlice.actions;

export default tasksSlice.reducer;
