import React from "react";
import Navbar from "./components/Navbar";
import { Page } from "./components/Page";
import { Box } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box paddingTop={"70px"}>
        <Page title="Categorias">Conteúdo</Page>
      </Box>
    </>
  );
};

export default App;
