import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteButton({ tasks, updateTasks, taskIndex }) {
  function handleClickDelete(taskIndex) {
    updateTasks(tasks.filter((task) => tasks.indexOf(task) !== taskIndex));
  }
  return (
    <IconButton onClick={() => handleClickDelete(taskIndex)}>
      <DeleteIcon></DeleteIcon>
    </IconButton>
  );
}

export default DeleteButton;
