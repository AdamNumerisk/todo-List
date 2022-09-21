import AddTaskForm from "../features/tasks/AddTaskForm";
import Header from "./Header";
import TaskList from "../features/tasks/TaskList";
import "../styles/Layout.css";
import "../styles/Header.css";
import "../styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, Grid, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Dashboard from "./Dashboard";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/system";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "primary.dark",
            minHeight: "100vh",
            maxHeight: false,
            pb: 1,
          }}
        >
          <div className="header">
            <Header></Header>
          </div>
          <Paper
            square={true}
            sx={{ backgroundColor: "primary.main", minheight: "80vh" }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              spacing={2}
              wrap="nowrap"
              sx={{ my: 0, mb: 2 }}
            >
              <Grid item xs={2} sx={{ ml: 2, mb: 2 }}>
                <AddTaskForm></AddTaskForm>
              </Grid>

              <Grid item xs={10} sx={{ mr: 2, mb: 2 }}>
                <Router>
                  <div>
                    <Routes>
                      <Route path="/" element={<TaskList />}></Route>
                      <Route path="/dashboard" element={<Dashboard />}></Route>
                    </Routes>
                  </div>
                </Router>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
