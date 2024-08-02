/* eslint react/jsx-boolean-value: "off" */

import React from "react";
import { styled } from "@mui/material/styles";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import theme from "../../../themes/theme";
// import TableOverlay from "../TableOverlay";

export interface CustomGridProps extends DataGridProps {
  columns: DataGridProps["columns"];
  rows: DataGridProps["rows"];
  checkboxSelection?: DataGridProps["checkboxSelection"];
  noRowsMessage?: string;
  component?: React.JSXElementConstructor<React.HTMLAttributes<HTMLDivElement>>;
  width?: string;
  height?: string;
  // onRowSelectionModelChange?: DataGridProps["onRowSelectionModelChange"];
  // components: DataGridProps["components"];
}

const TableComponent: React.FC<CustomGridProps> = ({
  width = "100%",
  height,
  rows,
  columns,
  checkboxSelection = false,
  // onRowSelectionModelChange,
  component,
  ...otherProps
}) => {
  const StyledGrid = styled(
    DataGrid,
    {}
  )<CustomGridProps>(() => {
    return {
      width,
      height: height ?? "100%",
      // width: "1011px",

      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      alignSelf: "stretch",
      " .MuiDataGrid-cell": {
        display: "flex",
        // height: "62px",
        padding: "12px 20px",
        alignItems: "center",
        gap: "8px",
        flex: "1 0 0",
        fontFamily: "Gilroy",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "normal",
        letterSpacing: "0.14px",
        color: theme.palette.textColor.lowEmphasis,
      },
      ".MuiDataGrid-main": {
        width: "100%",
      },

      "--DataGrid-rowBorderColor": "none",
      "--DataGrid-containerBackground": "#262529",
      "--unstable_DataGrid-radius": "8px",
      "--unstable_DataGrid-headWeight": 600,
      border: "none",
      ".MuiDataGrid-columnHeaderTitleContainer": {
        overflow: "hidden",
        color: theme.palette.textColor.lowEmphasis,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",

        fontFamily: "Gilroy",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "normal",
        letterSpacing: "0.14px",
      },
      "& .MuiDataGrid-columnSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus-within,& .MuiDataGrid-columnHeader:focus":
        {
          outline: " none",
        },

      "& .MuiDataGrid-container--top [role=row],.MuiDataGrid-row:hover ": {
        borderRadius: "8px",
      },
      ".MuiDataGrid-row": {
        // display: "flex",
        // alignItems: "flex-start",
        // verticalAlign: "middle",
        // height: "62px",
        // padding: "6px",
        // gap: "8px",
      },
      "& .MuiDataGrid-columnHeader": {
        display: "flex",
        padding: "12px 20px",
        alignItems: "center",
        gap: "8px",
        "& .MuiDataGrid-columnHeaderDraggableContainer": {
          display: "flex",
          height: "20px",
          flexDirection: "column",
          justifyContent: "center",
          flex: "1 0 0",
        },
      },
      "& .MuiDataGrid-columnHeaderCheckbox": {
        display: "flex",
        paddingLeft: "34px",
        padding: "12px 20px",
        alignItems: "center",
        gap: "12px",
        "& .MuiDataGrid-columnHeaderDraggableContainer": {
          display: "flex",
          width: "20px",
          height: "24px",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      "[data-testid='CheckBoxOutlineBlankIcon'] ,[data-testid='IndeterminateCheckBoxIcon']":
        {
          fill: "none",
        },

      "[data-testid='CheckBoxOutlineBlankIcon'] > path": {
        d: "path('M7.49984 18.3334H12.4998C16.6665 18.3334 18.3332 16.6667 18.3332 12.5V7.50002C18.3332 3.33335 16.6665 1.66669 12.4998 1.66669H7.49984C3.33317 1.66669 1.6665 3.33335 1.6665 7.50002V12.5C1.6665 16.6667 3.33317 18.3334 7.49984 18.3334Z')",
        stroke: "#727080",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      "[data-testid='IndeterminateCheckBoxIcon'] > path": {
        d: "path('M6.66675 10H13.3334 M7.50008 18.3334H12.5001C16.6667 18.3334 18.3334 16.6667 18.3334 12.5001V7.50008C18.3334 3.33341 16.6667 1.66675 12.5001 1.66675H7.50008C3.33341 1.66675 1.66675 3.33341 1.66675 7.50008V12.5001C1.66675 16.6667 3.33341 18.3334 7.50008 18.3334Z')",
        stroke: "#727080",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      "[data-testid='CheckBoxIcon'] > path": {
        d: "path('M7.50008 18.3334H12.5001C16.6667 18.3334 18.3334 16.6667 18.3334 12.5001V7.50008C18.3334 3.33341 16.6667 1.66675 12.5001 1.66675H7.50008C3.33341 1.66675 1.66675 3.33341 1.66675 7.50008V12.5001C1.66675 16.6667 3.33341 18.3334 7.50008 18.3334Z M6.45825 9.99993L8.81659 12.3583L13.5416 7.6416')",
        stroke: "#B4A9FF",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
    };
  });
  return (
    <StyledGrid
      rows={rows}
      columns={columns}
      checkboxSelection={checkboxSelection}
      // onRowSelectionModelChange={onRowSelectionModelChange}
      slots={{
        noRowsOverlay: component,
      }}
      hideFooter={true}
      disableColumnMenu={true}
      disableColumnResize={true}
      disableColumnFilter={true}
      disableColumnSorting={true}
      disableVirtualization={true}
      autosizeOptions={{ includeOutliers: true }}
      {...otherProps}
      // components={{
      //   NoRowsOverlay: <>No Data</>,
      // }}
    />
  );
};

export default TableComponent;
