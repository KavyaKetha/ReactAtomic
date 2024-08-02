import React from "react";
import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";

interface CustomCardProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}
const CardComponent: React.FC<CustomCardProps> = ({
  children,
  width = "250px",
  height = "250px",
  ...otherProps
}) => {
  const StyledCard = styled(
    "div",
    {}
  )(({ theme }) => {
    return {
      width,
      height,
      gap: "20px",
      borderRadius: " 12px",
      opacity: "0px",
      background: theme.palette.bgColor.bgElevation1,
      border: ` 1px solid ${theme.palette.borderColor.borderLowEmphasis}`,
      display: "flex",
      padding: "32px",
      flexDirection: "column",
      alignItems: "flex-start",
    };
  });

  return (
    <StyledCard {...otherProps}>
      <div {...otherProps}>{children}</div>
      {/* <Box {...otherProps}>{children}</Box> */}
    </StyledCard>
  );
};

export default CardComponent;
