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

import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector, useDispatch } from "react-redux";
import { taskEdited } from "./tasksSlice";

function EditDialog({ open, setOpen, taskId }) {
  const options = ["A faire", "En cours", "Terminé"];
  const task = useSelector((state) =>
    state.tasks.find((task) => task.id === taskId)
  );
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [newTaskStatus, setNewTaskStatus] = useState(task.status);
  const dispatch = useDispatch();

  function handleSave() {
    if (newTaskName !== task.name || newTaskStatus !== task.status) {
      dispatch(taskEdited({ taskId, newTaskName, newTaskStatus }));
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
