/* eslint react/jsx-boolean-value: "off" */

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

import Card from "../../atoms/Card";
import Typography from "../../atoms/Typography";
import Tooltip from "../../atoms/Tooltip";
import TableComponent from "../../atoms/Table";
import SummaryCard from "../SummaryCard";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Header from "../Header";

import { RowData } from "../../../interfaces/CashKick";
import theme from "../../../themes/theme";

import backSvg from "../../../assets/icons/back.svg";

const NewCashKickComponent: React.FC = () => {
  const StyledPayments = styled(
    "div",
    {}
  )(() => {
    return {
      ".ncc-content-container": {
        display: "flex",
        gap: "20px",
        width: "100%",
        ".ncc-table-card-container": {
          display: "flex",
          width: "700px",
          // padding: "32px 0px 32px 32px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        },
        ".ncc-summary-container": {
          display: "flex",
          width: "276px",
          height: "449px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        },
        ".h-stack": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          alignSelf: "stretch",
          width: "100%",
          color: theme.palette.textColor.lowEmphasis,
        },
        ".meta-data": {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          alignSelf: "stretch",
        },
        ".left-text": {
          flex: " 1 0 0",
          color: theme.palette.textColor.lowEmphasis,
        },
        ".right-text": {
          textAlign: "right",
        },
        hr: {
          width: "100%",
          height: "1px",
          background: theme.palette.borderColor.borderHighEmphasis,
          border: "none",
        },
        // ".ncc-table-container": {
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "flex-start",
        //   alignSelf: "stretch",
        // },
      },
      ".back-btn": {
        display: "inline-flex",
        padding: "6px 12px",
        alignItems: "center",
        gap: "8px",
        marginBottom: "32px",
        marginTop: "16px",
      },
    };
  });

  const [selectedContracts, setSelectedContracts] = useState<RowData[]>([]);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const columns: GridColDef[] = [
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
  const rows = [
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
  const handleSelection = (newRowSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    const selectedIDs = newRowSelectionModel;
    const selectedRowData = rows.filter((row) => {
      return selectedIDs.indexOf(row.id) !== -1;
    });
    setSelectedContracts(selectedRowData);
  };
  const handleIsReviewed = () => {
    setIsReviewed(!isReviewed);
  };

  return (
    <StyledPayments>
      <Header
        title="New cash kick"
        caption="Let’s setup a new cash kick to power your Saas"
      />
      <Button size="small" btnColor="teritary" className="back-btn">
        <Box className="refresh-icon">
          <Icon src={backSvg} />
        </Box>
        Back
      </Button>
      <Box className="ncc-content-container">
        <Card width="700px" height="465px" className="ncc-table-card-container">
          {!isReviewed ? (
            <>
              <Box className="ca-table-title-container">
                <Typography variantType="h1" sx={{ letterSpacing: "-0.12px" }}>
                  Your Contracts{"  "}
                  <span>
                    <Tooltip title="Info" />
                  </span>
                </Typography>
              </Box>

              <Box
                sx={{ width: "100%", overflowX: "scroll" }}
                className="ncc-table-container"
              >
                <TableComponent
                  columns={columns}
                  rows={rows}
                  checkboxSelection={true}
                  onRowSelectionModelChange={handleSelection}
                  rowSelectionModel={rowSelectionModel}
                  noRowsMessage="No Data to show"
                  height="416px"
                  width="776px"
                />
              </Box>
            </>
          ) : (
            <>
              <Box className="ca-table-title-container">
                <Typography variantType="h1" sx={{ letterSpacing: "-0.12px" }}>
                  Selected Contracts{"  "}
                  <span>
                    <Tooltip title="Info" />
                  </span>
                </Typography>
              </Box>
              <Box sx={{ width: "100%", overflowX: "scroll" }}>
                <TableComponent
                  columns={columns}
                  rows={selectedContracts}
                  checkboxSelection={false}
                  noRowsMessage="No Data to show"
                  height="416px"
                />
              </Box>
            </>
          )}
        </Card>
        <SummaryCard
          isReviewed={isReviewed}
          handleReview={handleIsReviewed}
          selectedContracts={selectedContracts}
        />
      </Box>
    </StyledPayments>
  );
};

export default NewCashKickComponent;
