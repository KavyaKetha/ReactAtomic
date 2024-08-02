// src/components/CustomNoRowsOverlay.tsx
import React from "react";
import { GridOverlay } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Typography from "../Typography";
import Icon from "../Icon";

import NoRowsImage from "../../../assets/images/norows.png";
// interface CustomNoRowsOverlayProps {
// //   iconSrc?: string;
// //   displayText?: string;
// }
const CustomNoRowsOverlay: React.FC = () => {
  return (
    <GridOverlay>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Icon
          src={NoRowsImage}
          alt="No data found"
          width="230px"
          height="160px"
        />
        <Typography variantType="body1">No rows to display</Typography>
      </Box>
    </GridOverlay>
  );
};

export default CustomNoRowsOverlay;
