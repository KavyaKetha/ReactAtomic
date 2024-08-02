/* eslint @typescript-eslint/dot-notation: 0 */

import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface CustomTextFieldProps {
  inputLabel?: TextFieldProps["label"];
  value?: TextFieldProps["value"];
  required?: TextFieldProps["required"];
  error?: TextFieldProps["error"];
  variant?: TextFieldProps["variant"];
  errorMessage?: TextFieldProps["helperText"];
  placeholder?: TextFieldProps["placeholder"];
  type?: TextFieldProps["type"];
  onChange?: TextFieldProps["onChange"];
  onBlur?: TextFieldProps["onBlur"];
  autoFocus?: TextFieldProps["autoFocus"];
  inputRef?: TextFieldProps["inputRef"];
}

const TextFieldComponent: React.FC<CustomTextFieldProps> = ({
  inputLabel,
  autoFocus,
  value,
  required,
  placeholder,
  error,
  errorMessage,
  type,
  inputRef,
  onChange,
  onBlur,
  variant = "outlined",
  ...otherProps
}) => {
  const StyledTextField = styled(
    TextField,
    {}
  )<CustomTextFieldProps>(({ theme }) => {
    return {
      ".MuiTextField-root": {
        height: "56px",
        // padding: "12px 17px 12px 17px",
        gap: "12px",
        opacity: "0px",
        border: `1px solid ${theme.palette.primary.light} !important`,
        background: theme.palette.grey[100],
      },
      ".textfield-container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
      },
      ".text-label": {
        display: "flex",
        flex: "1 0 0",
        color: theme.palette.textColor.lowEmphasis,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
      },
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        fontFamily: "Gilroy",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1 0 0",
          color: "#A5A5A6",
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        {inputLabel}
      </Box>
      <StyledTextField
        autoFocus={autoFocus}
        fullWidth
        defaultValue={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        helperText={errorMessage}
        type={type}
        onBlur={onBlur}
        inputRef={inputRef}
        variant={variant}
        InputLabelProps={{
          shrink: true,
        }}
        {...otherProps}
      />
    </div>
  );
};

export default TextFieldComponent;
