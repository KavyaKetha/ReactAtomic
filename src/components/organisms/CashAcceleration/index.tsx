import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import Card from "../../atoms/Card";
import Typography from "../../atoms/Typography";
import Tooltip from "../../atoms/Tooltip";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Tabs from "../../atoms/Tabs";

import TableComponent from "../../atoms/Table";
import CashAccelerationData from "../../molecules/CashAccelerationData";
import LaunchCashkickCard from "../LaunchCashkickCard";
import Header from "../Header";

import refresh from "../../../assets/icons/refresh.svg";
import Chip from "../../atoms/Chip";

const CashAccelerationComponent: React.FC = () => {
  const StyledIconCard = styled(
    "div",
    {}
  )(() => {
    return {
      ".ca-table-card-container": {
        display: "flex",
        flexDirection: "column",
        alignItems: " flex-start",
        gap: "20px",
        ".ca-table-title-container": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        },
        ".button-container": {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "132px",
          padding: "4px 12px",
          justifyContent: "center",
          alignSelf: "stretch",
          ".refresh-icon": {
            display: "flex",
            width: "20px",
            height: "20px",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          },
        },
        ".tabs-container": {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        },
        ".table-container": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        },
      },
      ".ca-data-container": {
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
      },
    };
  });

  const tabs = [
    { label: "My Contracts", value: "contracts" },
    { label: "My Cash Kicks", value: "cashkicks" },
  ];

  const myContractsColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      renderCell: (params) => {
        return <Typography variantType="body2">{params.value}</Typography>;
      },
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "expectedAmount",
      headerName: "Per payment",
      flex: 1,
    },
    {
      field: "termLength",
      headerName: "Term length",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variantType="body2"
              sx={{
                height: "18px",
                color: "#A5A5A6",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                alignSelf: "stretch",
              }}
            >
              {params.value}
            </Typography>
            <Typography
              variantType="caption"
              sx={{
                height: "18px",
                overflow: "hidden",
                color: "#A5A5A6",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              12.0% fee
            </Typography>
          </Box>
        );
      },
      flex: 1,
    },
    { field: "paymentAmount", headerName: "Payment amount", flex: 1 },
  ];
  const myContractsRows = [
    {
      id: 1,
      name: "Contract 1",
      type: "Monthly",
      expectedAmount: "$12,000.25",
      termLength: "12 months",
      paymentAmount: "$156,250.05",
    },
    {
      id: 2,
      name: "Contract 2",
      type: "Monthly",
      expectedAmount: "$12,000.25",
      termLength: "12 months",
      paymentAmount: "$156,250.05",
    },
    {
      id: 3,
      name: "Contract 3",
      type: "Monthly",
      expectedAmount: "$12,000.25",
      termLength: "12 months",
      paymentAmount: "$156,250.05",
    },
    {
      id: 4,
      name: "Contract 4",
      type: "Monthly",
      expectedAmount: "$12,000.25",
      termLength: "12 months",
      paymentAmount: "$156,250.05",
    },
  ];

  const myContractsData = {
    rows: myContractsRows,
    columns: myContractsColumns,
    checkboxSelection: false,
  };

  const myCashKicksColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      renderCell: (params) => {
        return <Typography variantType="body2">{params.value}</Typography>;
      },
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return <Chip label={params.value} />;
      },
      flex: 1,
    },
    {
      field: "maturity",
      headerName: "Maturity",
      flex: 1,
    },
    {
      field: "totalRecieved",
      headerName: "Total Recieved",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variantType="body2"
              sx={{
                height: "20px",
                color: "#A5A5A6",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                alignSelf: "stretch",
              }}
            >
              {params.value}
            </Typography>
            <Typography
              variantType="caption"
              sx={{
                height: "18px",
                overflow: "hidden",
                color: "#A5A5A6",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                alignSelf: "stretch",
              }}
            >
              12.0% fee
            </Typography>
          </Box>
        );
      },
      flex: 1,
    },
    { field: "totalFinanced", headerName: "Total Financed", flex: 1 },
  ];
  const myCashKicksRows = [
    {
      id: 1,
      name: "My first advance",
      status: "Pending",
      maturity: "Apr 03, 2022",
      totalRecieved: "$150,000.00",
      totalFinanced: "$170,454.55",
    },
  ];

  const myCashKicksData = {
    rows: myCashKicksRows,
    columns: myCashKicksColumns,
    checkboxSelection: false,
  };

  const [tableData, setTableData] = React.useState<
    typeof myCashKicksData | typeof myContractsData
  >(myContractsData);
  const [currentTab, setCurrentTab] = React.useState("contracts");

  const onTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    // Can be moved to useeffect on api call later
    if (newValue === "cashkicks") {
      setTableData(myCashKicksData);
    } else {
      setTableData(myContractsData);
    }
  };

  return (
    <StyledIconCard>
      <Header
        title="Cash accleration"
        caption="Place to create new cash kicks to run your business"
      />
      <Box className="ca-data-container">
        <CashAccelerationData />
        <LaunchCashkickCard />
      </Box>
      <Card width="996px" height="466px" className="ca-table-card-container">
        <Box className="ca-table-title-container">
          <Typography variantType="h1" sx={{ letterSpacing: "-0.12px" }}>
            Cash accleration{"  "}
            <span>
              <Tooltip title="Info" />
            </span>
          </Typography>
          <Button variant="text" btnColor="text" className="button-container">
            <Box className="refresh-icon">
              <Icon src={refresh} />
            </Box>
            Sync Now
          </Button>
        </Box>
        <Box className="tabs-container">
          <Tabs tabs={tabs} currentTab={currentTab} onChange={onTabChange} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <TableComponent
            columns={tableData.columns}
            rows={tableData.rows}
            checkboxSelection={tableData.checkboxSelection}
            noRowsMessage="No Rows to show"
            // component={tableData.tableComponent}
            width="1011px"
            height="466px"
          />
        </Box>
      </Card>
    </StyledIconCard>
  );
};

export default CashAccelerationComponent;
