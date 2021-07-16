import React, { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import genreHttp from "../../util/http/genre-http";
import { BadgeNo, BadgeYes } from "../../components/Badge";

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
        return value ? <BadgeYes /> : <BadgeNo />;
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

interface Genre {
  id: string;
  name: string;
}

type Props = {};
const Table = (props: Props) => {
  const [data, setData] = useState<Genre[]>([]);
  useEffect(() => {
    genreHttp.list<{ data: Genre[] }>().then(({ data }) => setData(data.data));
  }, []);
  return <MUIDataTable title="" columns={columnsDefinition} data={data} />;
};

export default Table;
