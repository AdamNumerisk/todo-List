import IconButton from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

function EditButton({ setEditableRowIndex, rowIndex, editableRowIndex }) {
  function handleClickEdit() {
    setEditableRowIndex([...editableRowIndex, rowIndex]);
  }

  return (
    <IconButton onClick={() => handleClickEdit()}>
      <EditIcon></EditIcon>
    </IconButton>
  );
}

export default EditButton;
