import React, { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { Chip } from "@material-ui/core";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import { httpVideo } from "../../util/http";

const columnsDefinition: MUIDataTableColumn[] = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "categories",
    label: "Categorias",
    options: {
      customBodyRender: (values, tableMeta, updateValue) => {
        return values.map((value: any) => value.name).join(", ");
      },
    },
  },
  {
    name: "is_active",
    label: "Ativo?",
    options: {
      customBodyRender(value, tableMeta, updateValue) {
        return value ? (
          <Chip label="Sim" color="primary" />
        ) : (
          <Chip label="Não" color="secondary" />
        );
      },
    },
  },
  {
    name: "created_at",
    label: "Criado em",
    options: {
      customBodyRender(value, tableMeta, updateValue) {
        return <span>{format(parseISO(value), "dd/MM/yyyy")}</span>;
      },
    },
  },
];

type Props = {};
const Table = (props: Props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    httpVideo.get("genres").then((response) => setData(response.data.data));
  }, []);
  return (
    <MUIDataTable
      title="Listagem de gêneros"
      columns={columnsDefinition}
      data={data}
    />
  );
};

export default Table;
