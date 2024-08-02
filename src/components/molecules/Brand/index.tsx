import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Icon from "../../atoms/Icon";
import Typography from "../../atoms/Typography";

import logo from "../../../assets/images/logo.svg";

const BrandComponent: React.FC = () => {
  const StyledBrandItem = styled(
    "div",
    {}
  )(({ theme }) => {
    return {
      ".brand-container": {
        display: "flex",
        padding: "2px 4px",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
      },
      ".logo-container": {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "28px",
        flexShrink: 0,
      },
      ".brand-name-container": {
        display: "flex",
        height: "32px",
        alignItems: "flex-start",
        justifyContent: " flex-end",
        flex: "1 0 0",
        color: theme.palette.textColor.highEmphasis,
        fontSize: "24px",
        fontWeight: 700,
        marginLeft: "8px",
        lineHeight: "normal",
      },
    };
  });

  return (
    <StyledBrandItem>
      <Box className="brand-container">
        <Box className="logo-container">
          <Icon src={logo} width="29.88px" height="28px" />
          <Typography className="brand-name-container">Seeder</Typography>
        </Box>
      </Box>
    </StyledBrandItem>
  );
};

export default BrandComponent;
