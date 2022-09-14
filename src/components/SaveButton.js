import moment from "moment";

function SaveButton({
  tasks,
  newTaskName,
  taskName,
  newTaskStatus,
  taskStatus,
  taskIndex,
  updateTasks,
  setEditState,
}) {
  function handleClickSave() {
    const newTasks = [...tasks];
    const isChanged = newTaskName !== taskName || newTaskStatus !== taskStatus;
    if (isChanged) {
      newTasks[taskIndex].name = `${newTaskName}`;
      newTasks[taskIndex].status = `${newTaskStatus}`;
      newTasks[taskIndex].modificationDate = `${moment().format("L")}`;

      updateTasks(newTasks);
    }
    setEditState(false);
  }
  return (
    <button className="save-button" onClick={() => handleClickSave()}>
      Sauvegarder
    </button>
  );
}

export default SaveButton;
