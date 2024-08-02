import React from "react";
import { styled } from "@mui/material/styles";

import Icon from "../../atoms/Icon";
import Typography, { CustomTypographyProps } from "../../atoms/Typography";

import { colors } from "../../../constants/theme";

interface CustomIconTypographyProps extends CustomTypographyProps {
  iconSrc: string;
  text: string;
  typographyVariantType?: CustomTypographyProps["variantType"];
  width?: string;
  height?: string;
}

const IconTypographyComponent: React.FC<CustomIconTypographyProps> = ({
  iconSrc,
  text,
  typographyVariantType = "body2",
  width = "13.34px",
  height = "13.34px",
}) => {
  const StyledIconTypography = styled("div", {
    shouldForwardProp: (prop) => prop !== "navText",
  })(() => {
    return {
      width: "210px",
      height: "50px",
      color: colors.textColor.primary,
      textAlign: "left",
      lineHeight: "14px",
      // gap: "12px",
    };
  });

  return (
    <StyledIconTypography>
      <Typography variantType={typographyVariantType}>
        <Icon src={iconSrc} width={width} height={height} />
        {text}
      </Typography>
    </StyledIconTypography>
  );
};

export default IconTypographyComponent;
