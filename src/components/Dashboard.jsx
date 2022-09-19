import {
  Card,
  Button,
  CardContent,
  Grid,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import theme from "./theme";

function Dashboard({ tasks }) {
  function getTodo(option) {
    const todo = tasks.filter((task) => task.status === option);
    const todoCount = todo.length;
    return todoCount;
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h3" align="center">
          Dashboard
        </Typography>
        <Grid container direction="row-reverse">
          <Grid item>
            <Button
              color="secondary"
              sx={{ my: 2 }}
              size="medium"
              variant="contained"
              href="/"
            >
              Liste de tâches
            </Button>
          </Grid>
        </Grid>
        <List sx={{ backgroundColor: theme.palette.action.hover }}>
          <ListItemText
            sx={{ ml: 2 }}
            primary={`Tâches à faire : ${getTodo("A faire")}`}
          ></ListItemText>
          <ListItemText
            sx={{ ml: 2 }}
            primary={`Tâches en cours : ${getTodo("En cours")}`}
          ></ListItemText>
          <ListItemText
            sx={{ ml: 2 }}
            primary={`Tâches terminées : ${getTodo("Terminé")}`}
          ></ListItemText>
        </List>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
