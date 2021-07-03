import React from "react";
import Navbar from "./components/Navbar";
import { Box } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import Breadcrumbs from "./components/Breadcrumbs";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box paddingTop={"70px"}>
        <Breadcrumbs />
        <AppRouter />
      </Box>
    </BrowserRouter>
  );
};

export default App;
