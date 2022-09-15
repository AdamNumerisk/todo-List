import { Button } from "@mui/material";

function DeleteAllButton({ updateTasks }) {
  function handleClick() {
    const emptyTasks = [];
    updateTasks(emptyTasks);
  }
  return (
    <Button size="medium" variant="contained" onClick={() => handleClick()}>
      Tout supprimer
    </Button>
  );
}

export default DeleteAllButton;
