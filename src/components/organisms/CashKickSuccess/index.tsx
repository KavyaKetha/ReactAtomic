import React from "react";
import Box from "@mui/material/Box";

import Typography from "../../atoms/Typography";
import Icon from "../../atoms/Icon";
import Modal from "../../molecules/Modal";

import { CashKickAlertProps } from "../../../interfaces/CashKick";
import ReviewGif from "../../../assets/images/review.gif";

const CashKickSuccessomponent: React.FC<CashKickAlertProps> = ({
  isModalOpen = false,
  setIsModalOpen,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    // Navigate to cash kicks
  };
  return (
    <Modal
      open={isModalOpen}
      handleClose={handleCloseModal}
      handleSubmit={handleModalSubmit}
      dialogTitle="Cash kick launched successfully!"
      submitText="View cash kicks"
      cancelText="Close"
      dialogSubtitle="We are reviewing your cash kick"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
          alignSelf: "stretch",
        }}
      >
        <Icon src={ReviewGif} width="172px" height="172px" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <Typography
            variantType="h2"
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              alignSelf: "stretch",
              textAlign: "center",
            }}
          >
            Your cash kick is under review
          </Typography>
          <Typography
            variantType="body1"
            sx={{
              alignSelf: "stretch",
              color: "#A5A5A6",
              textAlign: "center",
              lineHeight: "22.4px ",
            }}
          >
            It will remain on pending state until we review it internally. This
            can take upto 5 mins to couple of hours. Once reviewed, the cash
            will be transferred to your account and you’ll be notified.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default CashKickSuccessomponent;
