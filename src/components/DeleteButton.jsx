function DeleteButton({ tasks, updateTasks, taskIndex }) {
  function handleClickDelete(taskIndex) {
    updateTasks(tasks.filter((task) => tasks.indexOf(task) !== taskIndex));
  }
  return (
    <button onClick={() => handleClickDelete(taskIndex)}>Supprimer</button>
  );
}

export default DeleteButton;
