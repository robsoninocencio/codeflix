import * as React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Box, Fab } from "@material-ui/core";

import Table from "./Table";
import { Page } from "../../components/Page";
import routes, { MyRouteProps } from "../../routes";

const PageList = () => {
  const route: MyRouteProps = routes.find(
    (route) => route.name === "cast_members.create"
  ) as MyRouteProps;

  return (
    <Page title="">
      <Box dir={"rtl"} paddingBottom={2}>
        <Fab
          title="Adicionar membro de elenco"
          color="secondary"
          size="small"
          component={Link}
          to={route.path as string}
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
