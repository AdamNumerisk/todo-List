function EditButton2({ setEditableRowIndex, rowIndex, editableRowIndex }) {
  function handleClickEdit() {
    setEditableRowIndex([...editableRowIndex, rowIndex]);
  }

  return <button onClick={() => handleClickEdit()}>Modifier</button>;
}

export default EditButton2;
