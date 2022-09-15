import { Typography, Card, CardContent } from "@mui/material";
import "../styles/TaskList.css";

//import Tache from "./Tache";

import TaskTable from "./TaskTable";

function TaskList({ tasks, updateTasks, setTaskName }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">Liste de tâches</Typography>

        <div>
          <TaskTable data={tasks} updateData={updateTasks}></TaskTable>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskList;
