import { Typography, Card, CardContent, CardActions } from "@mui/material";
import "../styles/TaskList.css";
import DeleteAllButton from "./DeleteAllButton";
import DeleteAllCompletedButton from "./DeleteAllCompletedButton";
import TaskTable from "./TaskTable";

function TaskList({ tasks, updateTasks }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">Liste de tâches</Typography>

        <div>
          <TaskTable data={tasks} updateData={updateTasks}></TaskTable>
        </div>
      </CardContent>
      <CardActions sx={{ ml: 1, mt: -1, mb: 1 }}>
        <DeleteAllButton updateTasks={updateTasks}></DeleteAllButton>
        <DeleteAllCompletedButton
          tasks={tasks}
          updateTasks={updateTasks}
        ></DeleteAllCompletedButton>
      </CardActions>
    </Card>
  );
}

export default TaskList;
