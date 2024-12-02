import React, { useState } from "react";
import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";

type Module = {
  _id: string;
  name: string;
  course: string;
  lessons: any[];
  editing?: boolean;
};

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const handleAddModule = () => {
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={handleAddModule}
      />

      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <li
              key={module._id}
              className="d-flex align-items-center p-3 bg-secondary"
            >
              <BsGripVertical className="me-2 fs-3" />
              <div className="flex-grow-1">
                {!module.editing && module.name}
                {module.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
              </div>
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={() => dispatch(deleteModule(module._id))}
                editModule={() => dispatch(editModule(module._id))}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}


