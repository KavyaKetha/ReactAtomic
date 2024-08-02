import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import Card from "../../atoms/Card";
import Typography from "../../atoms/Typography";
import Chip from "../../atoms/Chip";
import Tooltip from "../../atoms/Tooltip";
import TableComponent from "../../atoms/Table";
import TableOverlay from "../../atoms/TableOverlay";
import WelcomeCard from "../../molecules/WelcomeCard";
import IconCard from "../../molecules/IconCard";
import LaunchCashkickCard from "../LaunchCashkickCard";
import HeaderComponent from "../Header";

import Reciept from "../../../assets/icons/reciept.svg";
import CircularProgress from "../../../assets/icons/circular-progress.svg";

const PaymentsComponent: React.FC = () => {
  const StyledPayments = styled(
    "div",
    {}
  )(() => {
    return {
      ".ca-table-card-container": {
        display: "flex",
        flexDirection: "column",
        alignItems: " flex-start",
        gap: "20px",
        width: "1060px",
        ".ca-table-title-container": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        },

        ".table-container": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        },
      },
      ".payments-icon-card": {
        display: "flex",
        width: "340px",
        height: "259px",
        // padding: "32px",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
      },
    };
  });

  const columns: GridColDef[] = [
    {
      field: "dueDate",
      headerName: "Due date",
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
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {params.value}
            </Typography>
            <Typography
              variantType="caption"
              sx={{
                width: "145px",
                height: "18px",
                overflow: "hidden",
                color: "#A5A5A6",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              31 day(s) from now
            </Typography>
          </Box>
        );
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
    { field: "expectedAmount", headerName: "Expected amount", flex: 1 },
    { field: "outstanding", headerName: "Outstanding", flex: 1 },
  ];
  const rows = [
    {
      id: 1,
      dueDate: "Mar 03, 2021",
      status: "Upcoming",
      expectedAmount: "-$14,204.55",
      outstanding: "$156,250.05",
    },
    {
      id: 2,
      dueDate: "Mar 03, 2021",
      status: "Upcoming",
      expectedAmount: "-$14,204.55",
      outstanding: "$156,250.05",
    },
    {
      id: 3,
      dueDate: "Mar 03, 2021",
      status: "Upcoming",
      expectedAmount: "-$14,204.55",
      outstanding: "$156,250.05",
    },
    {
      id: 4,
      dueDate: "Mar 03, 2021",
      status: "Upcoming",
      expectedAmount: "-$14,204.55",
      outstanding: "$156,250.05",
    },
    {
      id: 5,
      dueDate: "Mar 03, 2021",
      status: "Upcoming",
      expectedAmount: "-$14,204.55",
      outstanding: "$156,250.05",
    },
  ];
  return (
    <StyledPayments>
      <HeaderComponent title="Good afternoon ✋" caption="April 02, 2021" />
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          padding: "32px 0px 20px 0px",
        }}
      >
        {rows.length < 1 ? (
          <WelcomeCard />
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Card width="276px" height="195px">
              <IconCard
                iconSrc={Reciept}
                title="Due - May 03, 2021 "
                caption="$14,204.55"
              />
            </Card>
            <Card width="276px" height="195px">
              <IconCard
                iconSrc={CircularProgress}
                title="Outstanding amount "
                caption="$170,454.55"
              />
            </Card>
          </Box>
        )}
        <LaunchCashkickCard />
      </Box>
      <Card width="996px" height="466px" className="ca-table-card-container">
        <Box className="ca-table-title-container">
          <Typography variantType="h1" sx={{ letterSpacing: "-0.12px" }}>
            Your Payments{"  "}
            <span>
              <Tooltip title="Info" />
            </span>
          </Typography>
        </Box>

        <Box sx={{ width: "100%", height: "416px" }}>
          <TableComponent
            columns={columns}
            rows={rows}
            checkboxSelection={false}
            noRowsMessage="No Data to show"
            width="1011px"
            height="416px"
            component={TableOverlay}
          />
        </Box>
      </Card>
    </StyledPayments>
  );
};

export default PaymentsComponent;
