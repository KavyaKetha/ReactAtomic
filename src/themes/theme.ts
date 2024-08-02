import React from "react";
import { createTheme } from "@mui/material/styles";
import { fontFamily, colors } from "../constants/theme";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: React.CSSProperties;
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    caption: React.CSSProperties;
    button: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title: React.CSSProperties;
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    caption: React.CSSProperties;
    button: React.CSSProperties;
  }

  interface Palette {
    bgColor: Palette["primary"];
    borderColor: Palette["primary"];
    iconColor: Palette["primary"];
    textColor: Palette["primary"];
  }

  interface PaletteOptions {
    bgColor?: PaletteOptions["primary"];
    borderColor?: PaletteOptions["primary"];
    iconColor?: PaletteOptions["primary"];
    textColor?: PaletteOptions["primary"];
  }

  interface Color {
    primaryWhite?: string;
    highEmphasis?: string;
    medEmphasis?: string;
    lowEmphasis?: string;
    bgElevation0?: string;
    bgElevation1?: string;
    bgElevation2?: string;
    grey100?: string;
    borderHighEmphasis?: string;
    borderLowEmphasis?: string;
    iconHighEmphasis?: string;
    iconLowEmphasis?: string;
  }

  interface PaletteColor extends Color {}

  interface SimplePaletteColorOptions extends Color {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    h1: true;
    h2: true;
    body1: true;
    body2: true;
    caption: true;
    button: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    main: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: colors.primary,
    textColor: colors.textColor,
    bgColor: colors.bgColor,
    borderColor: colors.borderColor,
    iconColor: colors.iconColor,
    grey: {
      100: colors.bgColor.grey100,
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    allVariants: {
      fontFamily: [fontFamily, "Arial", "sans-serif"].join(","),
      color: colors.textColor.main,
    },
    title: {
      fontWeight: 700,
      fontSize: "36px",
      lineHeight: "42px",
    },
    h1: {
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "29.4px",
    },
    h2: {
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "27px",
    },
    body1: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "22.4px",
    },
    body2: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "17.15px",
    },
    caption: {
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "14.56px",
    },
    button: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "19px",
    },
  },
});

export default theme;
