import React from "react";
import Chip, { ChipProps } from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

import { colors } from "../../../constants/theme";

interface CustomAvatarProps extends ChipProps {
  bgColor?: string;
  label?: ChipProps["label"];
  variant?: ChipProps["variant"];
}

const AvatarComponent: React.FC<CustomAvatarProps> = ({
  label = "chip",
  variant = "filled",
  ...otherProps
}) => {
  const StyledAvatar = styled(
    Chip,
    {}
  )<CustomAvatarProps>(({ theme }) => {
    return {
      color: colors.textColor.secondary,
      backgroundColor: theme.palette.bgColor.bgElevation2,
      padding: "4px 8px 4px 8px",
      borderRadius: "4px",
      font: `${theme.typography.body2.fontWeight} ${theme.typography.body2.fontSize} ${theme.typography.body2.fontFamily} `,
    };
  });
  return <StyledAvatar label={label} variant={variant} {...otherProps} />;
};

export default AvatarComponent;
