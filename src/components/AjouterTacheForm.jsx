import moment from "moment";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";

import "../styles/AjouterTacheForm.css";
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";

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
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Ajouter une tâche
        </Typography>

        <TextField
          sx={{ mb: 2 }}
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        ></TextField>

        <FormControl>
          <FormLabel id="status-group-label">Statut</FormLabel>
          <RadioGroup
            aria-labelledby="status-group-label"
            name="status-radio-group"
          >
            {options.map((option) => (
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={option}
                checked={taskStatus === option}
                onChange={(e) => setTaskStatus(e.target.value)}
              ></FormControlLabel>
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          className="tache-form-button"
          onClick={() => addTask(taskName, taskStatus)}
        >
          Ajouter une tâche
        </Button>
      </CardActions>
    </Card>
  );
}

export default AjouterTacheForm;
