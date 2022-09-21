import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { taskDeletedCompleted } from "../features/tasks/tasksSlice";

function DeleteAllCompletedButton() {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(taskDeletedCompleted());
  }
  return (
    <Button color="secondary" variant="contained" onClick={() => handleClick()}>
      Supprimer les tâches terminées
    </Button>
  );
}

export default DeleteAllCompletedButton;
