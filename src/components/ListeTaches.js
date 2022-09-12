//import { useState } from "react";
import "../styles/ListeTaches.css";

function ListeTaches({ tasks, updateTasks }) {
  //const [editState, setEditState] = useState(false);
  function handleClickDelete(taskIndex) {
    updateTasks(tasks.filter((task) => tasks.indexOf(task) !== taskIndex));
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
            <button onClick={() => handleClickDelete(index)}>Supprimer</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ListeTaches;
