import moment from "moment";

import "../styles/AjouterTacheForm.css";

function AjouterTacheForm({
  tasks,
  updateTasks,
  taskName,
  setTaskName,
  taskStatus,
  setTaskStatus,
}) {
  const options = ["A faire", "En cours", "Terminé"];

  function addTask(taskName, taskStatus) {
    const isDefaultError = taskName === "Tache à faire...";
    if (isDefaultError) {
      alert("Veuillez remplir le nom du tâche");
    } else if (!taskStatus) {
      alert("Veuillez choisir un statut de tâche");
    } else {
      updateTasks([
        ...tasks,
        {
          name: taskName,
          status: taskStatus,
          creationDate: `${moment().format("L")}`,
          modificationDate: "-",
        },
      ]);
      setTaskName("Tache à faire...");
      setTaskStatus("");
    }
  }
  return (
    <div className="ajouter-tache-form">
      <h2>Ajouter une tâche</h2>
      <textarea
        className="tache-form-textarea"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      ></textarea>
      <div className="tache-form-options">
        {options.map((option, index) => (
          <div key={`${index}${option}`}>
            <input
              type="radio"
              name="statut"
              value={option}
              id={option}
              checked={taskStatus === option}
              onChange={(e) => setTaskStatus(e.target.value)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      <button
        className="tache-form-button"
        onClick={() => addTask(taskName, taskStatus)}
      >
        Ajouter une tâche
      </button>
    </div>
  );
}

export default AjouterTacheForm;
