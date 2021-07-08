import * as React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Table from "./Table";

import { Page } from "../../components/Page";

const PageList = () => {
  return (
    <Page title="Listagem Categorias">
      <Box dir={"rtl"} paddingBottom={2}>
        <Fab
          title="Adicionar categoria"
          color="secondary"
          size="small"
          component={Link}
          to="/categories/create"
        >
          <AddIcon />
        </Fab>
      </Box>
      <Box>
        <Table />
      </Box>
    </Page>
  );
};

export default PageList;
