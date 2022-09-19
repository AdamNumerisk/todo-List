import { Chip } from "@mui/material";

function StatusChip({ taskStatus }) {
  switch (taskStatus) {
    case "A faire":
      return (
        <Chip
          label="A faire"
          sx={{ backgroundColor: "#ff8989", color: "#8e0000" }}
        ></Chip>
      );
    case "En cours":
      return (
        <Chip
          label="En cours"
          sx={{ backgroundColor: "#feec8a", color: "#8d7801" }}
        ></Chip>
      );
    case "Terminé":
      return (
        <Chip
          label="Terminé"
          sx={{ backgroundColor: "#c2f296", color: "#447f0f" }}
        ></Chip>
      );
    default:
  }
}

export default StatusChip;
