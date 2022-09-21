import IconButton from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditDialog from "./EditDialog";
import { useState } from "react";

function EditButton({ taskId }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setEditOpen(true)}>
        <EditIcon></EditIcon>
      </IconButton>
      <EditDialog
        open={editOpen}
        setOpen={setEditOpen}
        taskId={taskId}
      ></EditDialog>
    </div>
  );
}

export default EditButton;
