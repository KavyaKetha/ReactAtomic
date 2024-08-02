import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Card from "../../atoms/Card";
import IconCard from "../IconCard";

import calendar from "../../../assets/icons/calendar.svg";
import documentDownload from "../../../assets/icons/document-download.svg";
import percentage from "../../../assets/icons/percentage.svg";

const CashAccelerationDataComponent: React.FC = () => {
  const StyledCashAccelerationCard = styled(
    "div",
    {}
  )(() => {
    return {
      ".ca-data-container": {
        display: "flex",
        width: "636px",
        height: "195px",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
      },
      ".icon-card": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "24px",
        flex: "1 0 0",
      },
    };
  });

  return (
    <StyledCashAccelerationCard>
      <Card className="ca-data-container">
        <Box className="icon-card">
          <IconCard iconSrc={calendar} title="Term cap" caption="12 months" />
        </Box>
        <Box className="icon-card">
          <IconCard
            iconSrc={documentDownload}
            title="Available credit"
            caption="$880.0k"
          />
        </Box>
        <Box className="icon-card">
          <IconCard
            iconSrc={percentage}
            title="Max interest rate"
            caption="12.00%"
          />
        </Box>
      </Card>
    </StyledCashAccelerationCard>
  );
};

export default CashAccelerationDataComponent;
