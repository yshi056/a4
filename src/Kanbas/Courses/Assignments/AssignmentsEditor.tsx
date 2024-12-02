export default function AssignmentsEditor({ dialogTitle, assignment, setAssignment, saveAssignment }:
    { dialogTitle: string; assignment: any; setAssignment: (assignment: any) => void; saveAssignment: () => void; }) {
      return (
        <div id="wd-add-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {dialogTitle} </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" value={assignment.name} placeholder="Assignment Name"
                       onChange={(e) => setAssignment({ ...assignment, name: e.target.value })}/>
                <textarea className="form-control mb-2" value={assignment.description} placeholder="Assignment Description"
                          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}/>
                <input type="number" className="form-control mb-2" value={assignment.points} placeholder="Points"
                       onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}/>
                <input type="date" className="form-control mb-2" value={assignment.dueDate} placeholder="Due Date"
                       onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}/>
                <input type="date" className="form-control mb-2" value={assignment.availableFrom} placeholder="Available From"
                       onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}/>
                <input type="date" className="form-control mb-2" value={assignment.availableUntil} placeholder="Available Until"
                       onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button onClick={saveAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Save Assignment </button>
              </div>
            </div>
          </div>
        </div>
      );
    }