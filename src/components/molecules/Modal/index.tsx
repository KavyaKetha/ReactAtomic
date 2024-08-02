import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import Button from "../../atoms/Button";
import Typography from "../../atoms/Typography";
import Icon from "../../atoms/Icon";

import close from "../../../assets/icons/cross.svg";

interface CustomModalProps extends DialogProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  submitDisabled?: boolean;
  dialogTitle: string;
  submitText: string;
  cancelText: string;
  dialogSubtitle: string;
}

const CustomModalComponent: React.FC<CustomModalProps> = ({
  open = false,
  submitDisabled,
  children,
  dialogTitle,
  dialogSubtitle,
  submitText,
  cancelText,
  handleClose,
  handleSubmit,
}) => {
  const StyledModal = styled(
    Dialog,
    {}
  )(({ theme }) => {
    return {
      "& .MuiPaper-root": {
        display: "flex",
        width: "640px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "12px",
        border: `1px solid ${theme.palette.borderColor.lowEmphasis}`,
        background: theme.palette.bgColor.grey100,
        boxShadow:
          "0px 24px 38px 0px rgba(0, 0, 0, 0.14), 0px 9px 46px 0px rgba(0, 0, 0, 0.12), 0px 11px 15px 0px rgba(0, 0, 0, 0.20)",
      },
      ".modal-header": {
        display: "flex",
        padding: " 24px 40px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
        ".title-container": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          flex: "1 0 0",

          ".md-subtitle": {
            color: theme.palette.textColor.lowEmphasis,
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "27px",
          },
        },
      },
      ".md-content-container": {
        display: "flex",
        padding: "24px 40px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        alignSelf: "stretch",
        ".md-content": {
          alignSelf: "stretch",
        },
      },
      ".md-action-container": {
        display: "flex",
        padding: "32px 40px 24px 40px",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
      },
      ".md-cross": {
        display: "flex",
        width: "32px",
        height: "32px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      "& .MuiDialog-paper": {
        zIndex: 99,
      },
    };
  });

  return (
    <StyledModal
      className="modal-container"
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit();
        },
      }}
    >
      <DialogTitle className="modal-header">
        <Box className="title-container">
          <Typography variantType="h1" className="md-heading">
            {dialogTitle}
          </Typography>
          <Typography className="md-subtitle">{dialogSubtitle}</Typography>
        </Box>
        <span className="md-cross">
          <Icon src={close} width="32px" height="32px" onClick={handleClose} />
        </span>
      </DialogTitle>
      <DialogContent className="md-content-container">
        <Box className="md-content">{children}</Box>
      </DialogContent>
      <DialogActions className="md-action-container">
        <Button onClick={handleClose} btnColor="teritary">
          {cancelText}
        </Button>
        <Button type="submit" disabled={submitDisabled}>
          {submitText}
        </Button>
      </DialogActions>
    </StyledModal>
  );
};

export default CustomModalComponent;
