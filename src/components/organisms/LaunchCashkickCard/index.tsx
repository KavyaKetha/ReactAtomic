import React from "react";
import { styled } from "@mui/material/styles";

import Card from "../../atoms/Card";
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";

const LaunchCashKickComponent: React.FC = () => {
  const StyledLaunchCashKickCard = styled(
    "div",
    {}
  )(() => {
    return {
      ".stack-container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        alignSelf: "stretch",
        lineHeight: "normal",
      },
      ".nck-button": {
        display: "flex",
        padding: "20px 40px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
        marginTop: "20px",
      },
    };
  });

  return (
    <StyledLaunchCashKickCard>
      <Card width="276px" height="193px">
        <div className="stack-container">
          <Typography
            variantType="h1"
            sx={{ alignSelf: "stretch", letterSpacing: "-0.12px" }}
          >
            Launch a new
          </Typography>
          <Typography
            variantType="h1"
            sx={{ alignSelf: "stretch", letterSpacing: "-0.12px" }}
          >
            Cash Kick
          </Typography>
          <Typography
            variantType="body1"
            sx={{ alignSelf: "stretch", color: "#C9C8CC" }}
          >
            You have upto <span className="bold-number"> $880,000.00</span>{" "}
            available for a new cash advance
          </Typography>
        </div>
        <Button className="nck-button" fullWidth>
          New Cash Kick
        </Button>
      </Card>
    </StyledLaunchCashKickCard>
  );
};

export default LaunchCashKickComponent;
