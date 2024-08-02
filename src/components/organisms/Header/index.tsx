import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Typography from "../../atoms/Typography";
import Avatar from "../../atoms/Avatar";

import profile from "../../../assets/images/profile.png";

interface HeaderProps {
  title: string;
  caption: string;
}
const HeaderComponent: React.FC<HeaderProps> = ({ title, caption }) => {
  const StyledHeader = styled(
    "div",
    {}
  )(() => {
    return {
      ".header-container": {
        display: "flex",
        width: "1060px",
        justifyContent: "space-between",
        alignItems: "center",
      },
      ".title-container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2px",
        flexShrink: 0,
      },
    };
  });

  return (
    <StyledHeader>
      <Box className="header-container">
        <Box className="title-container">
          <Typography variantType="title">{title}</Typography>
          <Typography className="h3">{caption}</Typography>
        </Box>
        <Avatar src={profile} />
      </Box>
    </StyledHeader>
  );
};

export default HeaderComponent;
