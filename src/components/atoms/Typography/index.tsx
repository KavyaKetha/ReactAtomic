// src/components/CustomTypography.tsx

import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

type VariantType =
  | "title"
  | "h1"
  | "h2"
  | "body1"
  | "body2"
  | "caption"
  | "button";
export interface CustomTypographyProps extends TypographyProps {
  children?: TypographyProps["children"];
  variantType?: VariantType;
}
const CustomTypography: React.FC<CustomTypographyProps> = ({
  children,
  variantType = "body1",
  ...otherProps
}) => {
  const StyledTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "variantType",
  })<CustomTypographyProps>(({ theme }) => {
    const fontType =
      {
        title: theme.typography.title,
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        body1: theme.typography.body1,
        body2: theme.typography.body2,
        caption: theme.typography.caption,
        button: theme.typography.button,
      }[variantType] ?? theme.typography.body1;
    return { ...fontType };
  });
  return (
    <StyledTypography variantType={variantType} {...otherProps}>
      {children}
    </StyledTypography>
  );
};

export default CustomTypography;
