import React from "react";
// import { CompactTable } from "@table-library/react-table-library/compact";
// import { useTheme } from "@table-library/react-table-library/theme";
// import { getTheme } from "@table-library/react-table-library/baseline";
// import {
//   useRowSelect,
//   SelectTypes,
// } from "@table-library/react-table-library/select";
import { useReactTable } from "@tanstack/react-table";

const TableDisplay = (props) => {
  // const data = { nodes: props.data };
  // const theme = useTheme(getTheme());
  // const COLUMNS = props.cols;
  // return <CompactTable columns={COLUMNS} data={data} theme={theme} />;
  const data = props.data;
  const columns = props.cols;
  const table = useReactTable({ columns, data });
};

export default TableDisplay;
