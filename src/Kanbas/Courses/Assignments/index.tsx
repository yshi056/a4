import React, { useState } from "react";
import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentControls";
import {
  addAssignment,
  editAssignment,
  updateAssignment,
  deleteAssignment,
} from "./reducer";

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

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const assignments: Assignment[] = useSelector(
    (state: any) => state.assignmentsReducer?.assignments || []
  );
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddAssignment = () => {
    if (assignmentTitle.trim() === "") 
    return; 
    dispatch(
      addAssignment({
        title: assignmentTitle,
        cid: cid || "", 
        description: "",
        points: "0",
        availableFrom: "",
        availableUntil: "",
      })
    );
    setAssignmentTitle("");
  };

  return (
    <div className="wd-assignments">
      <AssignmentsControls
        assignmentTitle={assignmentTitle}
        setAssignmentTitle={setAssignmentTitle}
        addAssignment={handleAddAssignment}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ul id="wd-assignments" className="list-group rounded-0">
        {assignments
          .filter((assignment: Assignment) => assignment.cid === cid)
          .map((assignment: Assignment) => (
            <li
              key={assignment._id}
              className="d-flex align-items-center p-3 bg-secondary"
            >
              <BsGripVertical className="me-2 fs-3" />
              <div className="flex-grow-1">
                {!assignment.editing && <span>{assignment.title}</span>}
                {assignment.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    value={assignment.title}
                    onChange={(e) =>
                      dispatch(
                        updateAssignment({
                          ...assignment,
                          title: e.target.value,
                        })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(
                          updateAssignment({
                            ...assignment,
                            editing: false,
                          })
                        );
                      }
                    }}
                  />
                )}
              </div>
              <AssignmentControlButtons
              editAssignment={() => dispatch(editAssignment(assignment._id))}
              deleteAssignment={() => dispatch(deleteAssignment(assignment._id))}
            />
            </li>
          ))}
      </ul>
    </div>
  );
}
