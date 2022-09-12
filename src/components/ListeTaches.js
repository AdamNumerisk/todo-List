//import { useState } from "react";
import "../styles/ListeTaches.css";

function ListeTaches({ tasks, updateTasks }) {
  //const [editState, setEditState] = useState(false);
  function handleClickDelete(taskName) {
    updateTasks(tasks.filter((task) => task.name !== taskName));
  }

  return (
    <div>
      <h2>Liste de tâches</h2>
      <ul>
        {tasks.map((task, index) => (
          <div className="taches">
            <li key={index}>
              {task.name} - {task.status}
            </li>
            <button onClick={() => handleClickDelete(task.name)}>
              Supprimer
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ListeTaches;
