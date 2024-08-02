import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import welcomebg from "../../../assets/images/welcomebg.png";

import { colors } from "../../../constants/theme";

const CardButtonComponent: React.FC = () => {
  const StyledCardButton = styled(
    "div",
    {}
  )(() => {
    return {
      ".card-container": {
        width: "700px",
        height: "259px",
        flexShrink: 0,
        boxSizing: "border-box",
        padding: "32px",
        background: `url(${welcomebg})`,
        ".welcome-text-container": {
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          fontWeight: 600,
          letterSpacing: "-0.12px",
          color: colors.white,
          fontSize: "24px",
          fontStyle: "normal",
          lineHeight: "normal",
        },
      },
    };
  });

  return (
    <StyledCardButton>
      <Box className="card-container">
        <Typography
          variantType="h1"
          sx={{ width: "265px" }}
          className=".welcome-text-container"
        >
          Congratulations you are ready to start!
        </Typography>
        <Typography
          variantType="body1"
          sx={{ width: "290px", paddingBottom: "15px", paddingTop: "15px" }}
        >
          You are approved for funding. We are ready to advance you upto{" "}
          <span className="bold-number"> $8.8M</span>
        </Typography>
        <Button btnColor="secondary" variant="contained">
          Learn More
        </Button>
      </Box>
    </StyledCardButton>
  );
};

export default CardButtonComponent;
