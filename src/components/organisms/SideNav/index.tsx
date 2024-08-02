import React from "react";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import IconTypography from "../../molecules/IconTypography";

// import { colors } from "../../../constants/theme";
import home from "../../../assets/icons/home.svg";
import cashacceleration from "../../../assets/icons/cash-acceleration.svg";
import logo from "../../../assets/images/logo.svg";

const SideNavComponent: React.FC = () => {
  const StyledSideNav = styled("div", {
    shouldForwardProp: (prop) => prop !== "navText",
  })(({ theme }) => {
    return {
      display: "inline-flex",
      height: "768px",
      padding: "40px 20px 20px 20px",
      flexDirection: "column",
      alignItems: "center",
      gap: "40px",
      flexShrink: 0,
      ".logo-container": {
        display: "flex",
        padding: "2px 4px",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
      },
      ".nav-item": {
        // width: "210px",
        // color: colors.textColor.primary,
        // textAlign: "left",
        // lineHeight: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "4px",
        flex: "1 0 0",
        "&:active": {
          borderRadius: "12px",
          background: theme.palette.bgColor.bgElevation2,
        },
        "&:hover": {
          borderRadius: "12px",
          background: theme.palette.bgColor.bgElevation2,
        },
        "& div > p ": {
          padding: "16px",
          img: {
            paddingRight: "15px",
          },
        },
      },
      ".text-item": {
        display: "flex",
        padding: "16px",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      },
    };
  });

  return (
    <StyledSideNav>
      <IconTypography
        iconSrc={logo}
        text="Seeder"
        typographyVariantType="h1"
        className="logo-container"
        width="29px"
        height="28px"
      />

      <Box>
        <Link href="/" variant="body2" underline="none" className="nav-item">
          <IconTypography iconSrc={home} text="Home" className="text-item" />
        </Link>
        <Link href="/" variant="body2" underline="none" className="nav-item">
          <IconTypography
            iconSrc={cashacceleration}
            text="Cash Accleration"
            className="text-item"
          />
        </Link>
      </Box>
    </StyledSideNav>
  );
};

export default SideNavComponent;
