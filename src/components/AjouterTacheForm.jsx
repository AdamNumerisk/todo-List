import moment from "moment";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";

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
      <TextField
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      ></TextField>
      <div className="tache-form-options">
        {options.map((option, index) => (
          <div key={`${index}${option}`}>
            <Radio
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
      <Button
        variant="contained"
        className="tache-form-button"
        onClick={() => addTask(taskName, taskStatus)}
      >
        Ajouter une tâche
      </Button>
    </div>
  );
}

export default AjouterTacheForm;
