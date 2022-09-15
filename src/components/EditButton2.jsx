import IconButton from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

function EditButton2({ setEditableRowIndex, rowIndex, editableRowIndex }) {
  function handleClickEdit() {
    setEditableRowIndex([...editableRowIndex, rowIndex]);
  }

  return (
    <IconButton onClick={() => handleClickEdit()}>
      <EditIcon></EditIcon>
    </IconButton>
  );
}

export default EditButton2;
