import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

interface AssignmentControlsProps {
  assignmentTitle: string;
  setAssignmentTitle: (title: string) => void;
  addAssignment: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function AssignmentControls({
  assignmentTitle,
  setAssignmentTitle,
  addAssignment,
  searchTerm,
  setSearchTerm,
}: AssignmentControlsProps) {
  return (
    <div id="wd-assignment-controls" className="text-nowrap">
      <div>
        <button
          id="wd-add-assignment-btn"
          className="btn btn-lg btn-danger me-1 float-end"
          onClick={addAssignment}
        >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>
        <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1 float-end">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </button>
      </div>

      <div className="position-relative w-50 me-1 float-end">
        <FaSearch className="position-absolute" style={{ top: "10px", left: "10px" }} />
        <input
          type="text"
          className="form-control"
          placeholder="Search for Assignment"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: "30px" }}
        />
      </div>
    </div>
  );
}