import React, { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import genreHttp from "../../util/http/cast-member-http";

const CastMemberTypeMap = {
  1: "Diretor",
  2: "Ator",
};

const columnsDefinition: MUIDataTableColumn[] = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "type",
    label: "Tipo",
    options: {
      customBodyRender(value, tableMeta, updateValue) {
        // return (CastMemberTypeMap as any)[value];
        return CastMemberTypeMap[value]; //  "noImplicitAny": false
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

interface CastMember {
  id: string;
  name: string;
  type: number;
}

type Props = {};
const Table = (props: Props) => {
  const [data, setData] = useState<CastMember[]>([]);
  useEffect(() => {
    genreHttp
      .list<{ data: CastMember[] }>()
      .then(({ data }) => setData(data.data));
  }, []);
  return <MUIDataTable title="" columns={columnsDefinition} data={data} />;
};

export default Table;
