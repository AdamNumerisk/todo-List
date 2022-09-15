import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
      light: "#48a999",
      dark: "#004c40",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#546e7a",
      light: "#819ca9",
      dark: "#29434e",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
