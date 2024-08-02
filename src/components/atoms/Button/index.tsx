import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type ButtonColor = "primary" | "secondary" | "teritary" | "text";

export interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  disabled?: ButtonProps["disabled"];
  btnColor?: ButtonColor;
  onClick?: ButtonProps["onClick"];
}

const ButtonComponent: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = "contained",
  size = "large",
  btnColor = "primary",
  disabled = false,
  ...otherProps
}) => {
  const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "btnColor",
  })<CustomButtonProps>(({ theme }) => {
    const buttonSizes =
      {
        small: "6px, 12px, 6px, 12px",
        medium: "12px, 24px, 12px, 24px",
        large: "20px 40px 20px 40px",
      }[size] ?? "12px, 24px, 12px, 24px";

    const bgColor =
      {
        primary: theme.palette.primary.main,
        teritary: theme.palette.bgColor.bgElevation2,
        secondary: "unset",
        text: "unset",
      }[btnColor] ?? theme.palette.primary.main;
    const textColor =
      {
        primary: theme.palette.text.primary,
        text: theme.palette.primary.light,
        secondary: theme.palette.text.primary,
        teritary: theme.palette.text.secondary,
      }[btnColor] || theme.palette.text.primary;

    return {
      color: textColor ?? btnColor,
      backgroundColor: bgColor,
      padding: buttonSizes,
      border: btnColor === "secondary" ? `1px solid ${textColor}` : "",
      fontSize: "16px",
      lineHeight: "19px",
      fontWeight: 600,
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: bgColor,
      },
      "&:disabled": {
        color: theme.palette.primary.contrastText,
        backgroundColor: bgColor,
        opacity: 0.56,
      },
      // textTransform: "none",
    };
  });
  return (
    <StyledButton
      variant={variant}
      size={size}
      btnColor={btnColor}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonComponent;
