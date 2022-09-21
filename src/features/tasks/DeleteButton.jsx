import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { taskDeleted } from "./tasksSlice";

function DeleteButton({ taskId }) {
  const dispatch = useDispatch();
  function handleClickDelete() {
    dispatch(taskDeleted(taskId));
  }
  return (
    <IconButton onClick={handleClickDelete}>
      <DeleteIcon></DeleteIcon>
    </IconButton>
  );
}

export default DeleteButton;
