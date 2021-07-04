import * as React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";

import Table from "./Table";
import { Page } from "../../components/Page";

const PageList = () => {
  return (
    <Page title="Listagem gêneros">
      <Box dir={"rtl"}>
        <Fab
          title="Adicionar gênero"
          size="small"
          component={Link}
          to="/genres/create"
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
