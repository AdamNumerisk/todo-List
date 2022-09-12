import { useState } from "react";

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
  }
  function handleClickSave() {
    const newTasks = [...tasks];
    newTasks[taskIndex].name = `${newTaskName}`;
    newTasks[taskIndex].status = `${newTaskStatus}`;
    updateTasks(newTasks);
    setEditState(false);
  }

  return (
    <div className="taches">
      <li>
        {editState ? (
          <div>
            <textarea
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            ></textarea>
            <select
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

      {!editState ? (
        <button onClick={() => handleClickEdit()}>Modifier</button>
      ) : (
        <button onClick={() => handleClickSave()}>Sauvegarder</button>
      )}

      <button onClick={() => handleClickDelete(taskIndex)} disabled={editState}>
        Supprimer
      </button>
    </div>
  );
}

export default Tache;