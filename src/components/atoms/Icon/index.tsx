import { styled } from "@mui/material";
import React from "react";

interface CustomIconComponentProps {
  width?: string;
  height?: string;
  padding?: string;
  src: string;
  color?: string;
  alt?: string;
  onClick?: () => void;
}

const StyledIcon = styled("img", {
  shouldForwardProp: (prop) => prop !== "padding" && prop !== "color",
})<{ padding?: string; color?: string }>(({ padding, height, width }) => ({
  height,
  width,
  padding,
}));

const IconComponent: React.FC<CustomIconComponentProps> = ({
  width = "15px",
  height = "15px",
  padding = "0px 0px 0px 0px",
  alt = "icon",
  src,
  ...otherProps
}) => {
  return (
    <StyledIcon
      data-testid="iconComponent"
      src={src}
      width={width}
      height={height}
      padding={padding}
      aria-label={alt}
      {...otherProps}
    />
  );
};

export default IconComponent;
