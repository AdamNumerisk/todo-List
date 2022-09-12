import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import moment from "moment";

function Tache({ taskName, taskStatus, updateTasks, tasks, taskIndex }) {
  const options = ["A faire", "En cours", "Terminé"];
  const [editState, setEditState] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("");
  function handleClickDelete(taskIndex) {
    updateTasks(tasks.filter((task) => tasks.indexOf(task) !== taskIndex));
  }
  function handleClickEdit() {
    setEditState(true);
    setNewTaskName(taskName);
    setNewTaskStatus(taskStatus);
  }
  function handleClickSave() {
    const newTasks = [...tasks];
    const isChanged = newTaskName !== taskName || newTaskStatus !== taskStatus;
    if (isChanged) {
      newTasks[taskIndex].name = `${newTaskName}`;
      newTasks[taskIndex].status = `${newTaskStatus}`;
      newTasks[taskIndex].modificationDate = moment().format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      updateTasks(newTasks);
    }
    setEditState(false);
  }

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
              <select
                className="edit-select"
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            `${taskName} - ${taskStatus}`
          )}
        </li>
        <div className="edit-delete-buttons">
          {!editState ? (
            <button onClick={() => handleClickEdit()}>Modifier</button>
          ) : (
            <button className="save-button" onClick={() => handleClickSave()}>
              Sauvegarder
            </button>
          )}

          {!editState && (
            <button
              onClick={() => handleClickDelete(taskIndex)}
              disabled={editState}
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tache;
