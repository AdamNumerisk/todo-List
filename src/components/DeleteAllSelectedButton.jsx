import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { taskDeletedSelected } from "../features/tasks/tasksSlice";

function DeleteAllSelectedButton({ rowSelection, setRowSelection }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(taskDeletedSelected(rowSelection));

    setRowSelection([]);
  }
  return (
    <Button color="secondary" variant="contained" onClick={handleClick}>
      Supprimer les tâches sélectionnées
    </Button>
  );
}

export default DeleteAllSelectedButton;
