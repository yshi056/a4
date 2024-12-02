import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

interface AssignmentControlButtonsProps {
  editAssignment: () => void;
  deleteAssignment: () => void;
}

export default function AssignmentControlButtons({
  editAssignment,
  deleteAssignment,
}: AssignmentControlButtonsProps) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <button
        className="btn btn-secondary btn-sm me-2"
        onClick={editAssignment}
      >
        Edit
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={deleteAssignment}
      >
        Delete
      </button>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}