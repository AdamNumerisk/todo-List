import { useEffect, useState } from "react";
import AjouterTacheForm from "./AjouterTacheForm";
import Header from "./Header";
import TaskList from "./TaskList";
import "../styles/Layout.css";
import "../styles/Header.css";
import "../styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  const [taskName, setTaskName] = useState("Tache à faire...");
  const [taskStatus, setTaskStatus] = useState("");
  const savedTasks = localStorage.getItem("tasks");
  const [tasks, updateTasks] = useState(
    savedTasks ? JSON.parse(savedTasks) : []
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="header">
          <Header></Header>
        </div>

        <Grid
          container
          direction="row"
          justifyContent="space-around"
          spacing={2}
          wrap="nowrap"
          sx={{ my: 0, mb: 2 }}
        >
          <Grid item xs={3} sx={{ ml: 2 }}>
            <AjouterTacheForm
              tasks={tasks}
              updateTasks={updateTasks}
              taskName={taskName}
              setTaskName={setTaskName}
              taskStatus={taskStatus}
              setTaskStatus={setTaskStatus}
            ></AjouterTacheForm>
          </Grid>

          <Grid item xs={9} sx={{ mr: 2 }}>
            <TaskList
              tasks={tasks}
              updateTasks={updateTasks}
              setTaskName={setTaskName}
            ></TaskList>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
