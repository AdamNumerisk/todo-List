function SaveButton2({ setEditableRowIndex, editableRowIndex, taskIndex }) {
  function handleClickSave() {
    const newIndexes = editableRowIndex.filter((index) => index !== taskIndex);
    console.log(newIndexes);
    setEditableRowIndex(newIndexes);
  }

  return (
    <button className="save-button" onClick={() => handleClickSave()}>
      Sauvegarder
    </button>
  );
}

export default SaveButton2;
