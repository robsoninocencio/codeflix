import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#79aec8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4db5ab",
      contrastText: "#fff",
    },
    background: {
      default: "#fafafa",
    },
  },
  overrides: {
    MUIDataTable: {},
  },
});

export default theme;
