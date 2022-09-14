import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import SaveButton from "./SaveButton";
import EditTaskStatusSelect from "./EditTaskStatusSelect";

function Task({ taskName, taskStatus, updateTasks, tasks, taskIndex }) {
  const [editState, setEditState] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("");

  return (
    <div className="liste-taches">
      <div className="taches">
        <li>
          {editState ? (
            <div className="edit-tache">
              <TextareaAutosize
                className="edit-textarea"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              ></TextareaAutosize>
              <EditTaskStatusSelect
                newTaskStatus={newTaskStatus}
                setNewTaskStatus={setNewTaskStatus}
              ></EditTaskStatusSelect>
            </div>
          ) : (
            `${taskName} - ${taskStatus}`
          )}
        </li>
        <div className="edit-delete-buttons">
          {!editState ? (
            <EditButton
              setEditState={setEditState}
              setNewTaskName={setNewTaskName}
              setNewTaskStatus={setNewTaskStatus}
              taskName={taskName}
              taskStatus={taskStatus}
            ></EditButton>
          ) : (
            <SaveButton
              tasks={tasks}
              newTaskName={newTaskName}
              taskName={taskName}
              newTaskStatus={newTaskStatus}
              taskStatus={taskStatus}
              taskIndex={taskIndex}
              updateTasks={updateTasks}
              setEditState={setEditState}
            ></SaveButton>
          )}

          {!editState && (
            <DeleteButton
              tasks={tasks}
              updateTasks={updateTasks}
              taskIndex={taskIndex}
            ></DeleteButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
