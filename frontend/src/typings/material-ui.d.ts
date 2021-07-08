import { ComponentNameToClassKey } from "@material-ui/core/styles/overrides";

declare module "@material-ui/core/styles/overrides" {
  interface ComponentNameToClassKey {
    MUIDataTable: any;
    MUIDataTableToolbar: any;
    MuiTableSortLabel: any;
    MUIDataTableHeadCell: any;
    MUIDataTableSelectCell: any;
    MUIDataTableBodyCell: any;
    MUIDataTableToolbarSelect: any;
    MUIDataTableBodyRow: any;
    MUIDataTablePagination: any;
    MUIDataTableFilterList: any;
  }
}
