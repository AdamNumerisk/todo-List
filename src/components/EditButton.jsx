function EditButton({
  setEditState,
  setNewTaskName,
  setNewTaskStatus,
  taskName,
  taskStatus,
}) {
  function handleClickEdit() {
    setEditState(true);
    setNewTaskName(taskName);
    setNewTaskStatus(taskStatus);
  }

  return <button onClick={() => handleClickEdit()}>Modifier</button>;
}

export default EditButton;
