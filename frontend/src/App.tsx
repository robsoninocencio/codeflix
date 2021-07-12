import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core";

import Breadcrumbs from "./components/Breadcrumbs";
import Navbar from "./components/Navbar";
import { SnackbarProvider } from "./components/SnackbarProvider";
import AppRouter from "./routes/AppRouter";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Box paddingTop={"70px"}>
            <Breadcrumbs />
            <AppRouter />
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default App;
