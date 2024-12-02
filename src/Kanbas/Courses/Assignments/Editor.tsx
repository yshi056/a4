import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { assignmentId, courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNewAssignment = !assignmentId;

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    cid: "",
    description: "",
    points: "",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    if (!isNewAssignment) {
      const existingAssignment = assignments.find((a: any) => a._id === assignmentId);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [assignmentId, isNewAssignment, assignments]);

  const handleInputChange = (field: string, value: string) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (isNewAssignment) {
      const newAssignment = {
        ...assignment,
        _id: `A${assignments.length + 1}`,
        course: courseId,
      };
      dispatch(addAssignment(newAssignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <div>
      <h2>{isNewAssignment ? "New Assignment" : "Edit Assignment"}</h2>

      <input
        value={assignment.title}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className="form-control mb-2"
        placeholder="Assignment Name"
      />

      <textarea
        value={assignment.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        className="form-control mb-2"
        rows={5}
        placeholder="Description"
      />

      <div className="form-group mb-2">
        <label>Points:</label>
        <input
          type="number"
          value={assignment.points}
          onChange={(e) => handleInputChange("points", e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label>Due Date:</label>
        <input
          type="date"
          value={assignment.dueDate}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label>Available From:</label>
        <input
          type="date"
          value={assignment.availableFrom}
          onChange={(e) => handleInputChange("availableFrom", e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label>Available Until:</label>
        <input
          type="date"
          value={assignment.availableUntil}
          onChange={(e) => handleInputChange("availableUntil", e.target.value)}
          className="form-control"
        />
      </div>

      <button onClick={handleSave} className="btn btn-primary me-2">
        Save
      </button>
      <button
        onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments`)}
        className="btn btn-secondary"
      >
        Cancel
      </button>
    </div>
  );
}
