import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

export default function Grid({ rowData, colDefs }) {
  const defaultColDef = useMemo(() => {
    return {
      filter: "name",
      floatingFilter: true,
      flex: 1,
    };
  }, []);

  return (
    <div className={"h-[100vh] w-[100vw] ag-theme-quartz"}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
