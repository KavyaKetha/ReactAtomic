import React from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

interface CustomAvatarProps extends AvatarProps {
  children?: React.ReactNode;
  alt?: AvatarProps["alt"];
  src?: AvatarProps["src"];
  sizes?: AvatarProps["sizes"];
  color?: AvatarProps["color"];
  variant?: AvatarProps["variant"];
  onClick?: React.MouseEventHandler;
}

const AvatarComponent: React.FC<CustomAvatarProps> = ({
  children,
  onClick,
  color = "primary",
  sizes = "medium",
  variant = "circular",
  ...otherProps
}) => {
  const StyledAvatar = styled(
    Avatar,
    {}
  )<CustomAvatarProps>(({ theme }) => {
    return {
      color: color ?? theme.palette.iconColor.main,
      cursor: "pointer",
    };
  });
  return (
    <StyledAvatar
      sizes={sizes}
      onClick={onClick}
      color={color}
      variant={variant}
      {...otherProps}
    >
      {children}
    </StyledAvatar>
  );
};

export default AvatarComponent;
