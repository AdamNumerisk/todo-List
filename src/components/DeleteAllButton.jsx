import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { taskDeletedAll } from "../features/tasks/tasksSlice";

function DeleteAllButton() {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(taskDeletedAll());
  }
  return (
    <Button
      color="secondary"
      size="medium"
      variant="contained"
      onClick={handleClick}
    >
      Tout supprimer
    </Button>
  );
}

export default DeleteAllButton;
