import moment from "moment";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import "../styles/AjouterTacheForm.css";
import {
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";

function AjouterTacheForm({
  tasks,
  updateTasks,
  taskName,
  setTaskName,
  taskStatus,
  setTaskStatus,
}) {
  const options = ["A faire", "En cours", "Terminé"];
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  function addTask(taskName, taskStatus) {
    const isDefaultError = taskName === "";
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
      setTaskName("");
      setTaskStatus("");
    }
    setAddTaskOpen(false);
  }
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center">
            Menu
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            sx={{ mx: 1, my: 1 }}
            variant="contained"
            fullWidth
            onClick={() => setAddTaskOpen(true)}
            startIcon={<AddTaskIcon />}
          >
            Ajouter une tâche
          </Button>
        </CardActions>
      </Card>

      <Dialog open={addTaskOpen}>
        <DialogTitle>Ajouter une tâche</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez remplir un nom de tâche et son statut.
          </DialogContentText>

          <TextField
            sx={{ mb: 2, mt: 1 }}
            fullWidth
            label="Tache à faire..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          ></TextField>

          <FormControl sx={{ ml: 2, mb: -1 }}>
            <FormLabel id="status-group-label">Statut</FormLabel>
            <RadioGroup
              aria-labelledby="status-group-label"
              name="status-radio-group"
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                  checked={taskStatus === option}
                  onChange={(e) => setTaskStatus(e.target.value)}
                ></FormControlLabel>
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ mb: 1, ml: 1 }}
            color="secondary"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => addTask(taskName, taskStatus)}
          >
            Ajouter une tâche
          </Button>

          <Button
            sx={{ mb: 1, mr: 1 }}
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => setAddTaskOpen(false)}
          >
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AjouterTacheForm;
