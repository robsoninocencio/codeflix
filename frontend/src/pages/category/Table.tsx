import React, { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";

import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import categoryHttp from "../../util/http/category-http";
import { BadgeNo, BadgeYes } from "../../components/Badge";

const columnsDefinition: MUIDataTableColumn[] = [
  {
    name: "name",
    label: "Nome",
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

interface ICategory {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
}

type Props = {};
const Table = (props: Props) => {
  const [data, setData] = useState<ICategory[]>([]);
  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        const { data } = await categoryHttp.list<{ data: ICategory[] }>();
        if (isSubscribed) {
          setData(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return <MUIDataTable title="" columns={columnsDefinition} data={data} />;
};

export default Table;
