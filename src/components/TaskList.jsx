import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import "../styles/TaskList.css";
import DeleteAllButton from "./DeleteAllButton";
import DeleteAllCompletedButton from "./DeleteAllCompletedButton";
import TableSearchBar from "./TableSearchBar";
import TaskTable from "./TaskTable";

function TaskList({ tasks, updateTasks }) {
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" align="center">
          Liste de tâches
        </Typography>
        <Grid
          container
          direction="row"
          alignSelf="baseline"
          justifyContent="space-between"
          sx={{ mt: -1 }}
        >
          <Grid item>
            <TableSearchBar
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            ></TableSearchBar>
          </Grid>
          <Grid item>
            <Button
              sx={{ mb: -7 }}
              size="medium"
              variant="contained"
              href="/dashboard"
            >
              Dashboard
            </Button>
          </Grid>
        </Grid>

        <TaskTable
          data={tasks}
          updateData={updateTasks}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        ></TaskTable>
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
