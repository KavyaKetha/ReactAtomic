/* eslint dot-notation: "off" */
/* eslint @typescript-eslint/dot-notation: "off" */
/*  @typescript-eslint/dot-notation: "off" */
/* dot-notation: "off" */

import React, { useRef } from "react";

import TextField from "../../atoms/TextField";
import Modal from "../../molecules/Modal";

import { CashKickAlertProps } from "../../../interfaces/CashKick";

const CashKickAlertComponent: React.FC<CashKickAlertProps> = ({
  isModalOpen = false,
  setIsModalOpen,
}) => {
  const nameRef = useRef(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    if (nameRef.current) {
      console.log("Modal submitted", nameRef.current["value"]);
      setIsModalOpen(false);
    }
    // Add API call
    // Navigate to cash kicks
  };

  return (
    <Modal
      open={isModalOpen}
      handleClose={handleCloseModal}
      handleSubmit={handleModalSubmit}
      dialogTitle="Name your cash kick"
      submitText="Create cash kick"
      cancelText="Cancel"
      dialogSubtitle="Add a name to identify your cash kick"
      // submitDisabled={nameRef.current !== ""}
    >
      <TextField
        inputLabel="Cash kick name"
        value={nameRef.current}
        required
        inputRef={nameRef}
      />
    </Modal>
  );
};

export default CashKickAlertComponent;
