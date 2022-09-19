import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

function EditDialog({ tasks, updateTasks, open, setOpen, taskIndex }) {
  const options = ["A faire", "En cours", "Terminé"];
  const [newTaskName, setNewTaskName] = useState(tasks[taskIndex].name);
  const [newTaskStatus, setNewTaskStatus] = useState(tasks[taskIndex].status);
  function handleSave() {
    const isChanged =
      tasks[taskIndex].name !== newTaskName ||
      tasks[taskIndex].status !== newTaskStatus;

    if (isChanged) {
      const newTasks = [...tasks];
      newTasks[taskIndex].name = newTaskName;
      newTasks[taskIndex].status = newTaskStatus;
      newTasks[taskIndex].modificationDate = `${moment().format("L")}`;
      updateTasks(newTasks);
    }
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Modifier une tâche</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez remplir les modifications
        </DialogContentText>
        <TextField
          sx={{ mb: 2, mt: 1 }}
          fullWidth
          label="Modifier"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        ></TextField>

        <FormControl sx={{ ml: 2, mb: -1 }}>
          <FormLabel id="status-group-label">Statut</FormLabel>
          <RadioGroup
            aria-labelledby="status-group-label"
            name="status-radio-group"
            value={newTaskStatus}
            onChange={(e) => setNewTaskStatus(e.target.value)}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
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
          onClick={handleSave}
          endIcon={<SaveIcon />}
        >
          Sauvegarder
        </Button>

        <Button
          sx={{ mb: 1, mr: 1 }}
          color="secondary"
          size="large"
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
