import { useState } from "react";

function AjouterTacheForm({ tasks, updateTasks, taskName, setTaskName }) {
  const options = ["A faire", "En cours", "Terminé"];

  const [taskStatus, setTaskStatus] = useState("");

  function addTask(taskName, taskStatus) {
    const isDefaultError = taskName === "Tache à faire...";
    if (isDefaultError) {
      alert("Veuillez remplir le nom du tâche");
    } else if (!taskStatus) {
      alert("Veuillez choisir un statut de tâche");
    } else {
      updateTasks([...tasks, { name: taskName, status: taskStatus }]);
    }
  }

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      <textarea
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      ></textarea>

      {options.map((option, index) => (
        <div key={`${index}${option}`}>
          <input
            type="radio"
            name="statut"
            value={option}
            checked={taskStatus === option}
            onChange={(e) => setTaskStatus(e.target.value)}
          />
          <label for={option}>{option}</label>
        </div>
      ))}
      <button onClick={() => addTask(taskName, taskStatus)}>
        Ajouter une tâche
      </button>
    </div>
  );
}

export default AjouterTacheForm;
