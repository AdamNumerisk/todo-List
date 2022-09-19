import { Button } from "@mui/material";

function DeleteAllSelectedButton({
  tasks,
  updateTasks,
  rowSelection,
  setRowSelection,
}) {
  function handleClick() {
    const deleteSelectedTasks = tasks.filter(
      (task) => rowSelection[tasks.indexOf(task)] !== true
    );
    updateTasks(deleteSelectedTasks);
    setRowSelection([]);
  }
  return (
    <Button color="secondary" variant="contained" onClick={() => handleClick()}>
      Supprimer les tâches sélectionnées
    </Button>
  );
}

export default DeleteAllSelectedButton;
