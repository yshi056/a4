import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../Database"; 

type Assignment = {
  _id: string;
  title: string;
  cid: string;
  description: string;
  points: string;
  availableFrom: string;
  availableUntil: string;
  editing?: boolean;
};

const initialState = {
  assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: PayloadAction<Partial<Assignment>>) => {
      const newAssignment: Assignment = {
        _id: new Date().getTime().toString(),
        title: payload.title || "New Assignment",
        cid: payload.cid || "",
        description: payload.description || "",
        points: payload.points || "0",
        availableFrom: payload.availableFrom || "",
        availableUntil: payload.availableUntil || "",
        editing: false,
      };
      state.assignments = [...state.assignments, newAssignment];
    },

    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
    },

    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === payload._id ? payload : assignment
      );
    },

    editAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, editing: true }
          : assignment
      );
    },

    setEditingComplete: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, editing: false }
          : assignment
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  setEditingComplete,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;