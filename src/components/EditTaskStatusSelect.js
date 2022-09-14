import moment from "moment";

function EditTaskStatusSelect({
  newTaskStatus,
  setNewTaskStatus,
  initialStatus,
  status,
  data,
  updateData,
  index,
}) {
  const options = ["A faire", "En cours", "Terminé"];
  const onBlur = () => {
    const isChanged = initialStatus !== status;
    if (isChanged) {
      const newData = [...data];
      newData[index].status = status;
      newData[index].modificationDate = `${moment().format("L")}`;
      updateData(newData);
    }
  };
  return (
    <select
      className="edit-select"
      value={newTaskStatus}
      onChange={(e) => setNewTaskStatus(e.target.value)}
      onBlur={onBlur}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default EditTaskStatusSelect;
