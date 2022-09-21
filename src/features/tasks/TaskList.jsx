import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import "../../styles/TaskList.css";
import DeleteAllButton from "../../components/DeleteAllButton";
import DeleteAllCompletedButton from "../../components/DeleteAllCompletedButton";
import TableSearchBar from "../../components/TableSearchBar";
import TaskTable from "./TaskTable";
import DeletedAllSelectedButton from "../../components/DeleteAllSelectedButton";
import { useSelector } from "react-redux";

function TaskList({ updateTasks }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState([]);
  const tasks = useSelector((state) => state.tasks);

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
              color="secondary"
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
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        ></TaskTable>
      </CardContent>
      <CardActions sx={{ ml: 1, mt: -1, mb: 1 }}>
        <DeleteAllButton></DeleteAllButton>
        <DeleteAllCompletedButton></DeleteAllCompletedButton>
        <DeletedAllSelectedButton
          tasks={tasks}
          updateTasks={updateTasks}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        ></DeletedAllSelectedButton>
      </CardActions>
    </Card>
  );
}

export default TaskList;
