import IconButton from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

function SaveButton2({ setEditableRowIndex, editableRowIndex, taskIndex }) {
  function handleClickSave() {
    const newIndexes = editableRowIndex.filter((index) => index !== taskIndex);
    console.log(newIndexes);
    setEditableRowIndex(newIndexes);
  }

  return (
    <IconButton className="save-button" onClick={() => handleClickSave()}>
      <SaveIcon></SaveIcon>
    </IconButton>
  );
}

export default SaveButton2;
