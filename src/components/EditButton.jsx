import IconButton from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditDialog from "./EditDialog";
import { useState } from "react";

function EditButton({ tasks, updateTasks, taskIndex }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setEditOpen(true)}>
        <EditIcon></EditIcon>
      </IconButton>
      <EditDialog
        tasks={tasks}
        updateTasks={updateTasks}
        open={editOpen}
        setOpen={setEditOpen}
        taskIndex={taskIndex}
      ></EditDialog>
    </div>
  );
}

export default EditButton;
