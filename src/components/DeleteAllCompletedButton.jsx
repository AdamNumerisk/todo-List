import { Button } from "@mui/material";

function DeleteAllCompletedButton({ tasks, updateTasks }) {
  function handleClick() {
    const deletedFinishedTasks = tasks.filter(
      (task) => task.status !== "Terminé"
    );
    updateTasks(deletedFinishedTasks);
  }
  return (
    <Button color="secondary" variant="contained" onClick={() => handleClick()}>
      Supprimer les tâches terminées
    </Button>
  );
}

export default DeleteAllCompletedButton;
