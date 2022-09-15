import { Menu, MenuItem, Select } from "@mui/material";
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
    <Select
      size="small"
      value={newTaskStatus}
      onChange={(e) => setNewTaskStatus(e.target.value)}
      onBlur={onBlur}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  );
}

export default EditTaskStatusSelect;
