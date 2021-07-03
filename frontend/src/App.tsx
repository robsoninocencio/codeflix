import React from "react";
import Navbar from "./components/Navbar";
import { Box } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/AppRouter";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box paddingTop={"70px"}>
        <AppRouter />
      </Box>
    </BrowserRouter>
  );
};

export default App;
