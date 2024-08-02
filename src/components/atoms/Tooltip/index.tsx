import React from "react";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

import infoIcon from "../../../assets/icons/info.svg";

interface CustomTooltipProps {
  title?: TooltipProps["title"];
  width?: string;
  height?: string;
}

const TooltipComponent: React.FC<CustomTooltipProps> = ({
  title,
  width = "16.7px",
  height = "16.7px",
  ...otherProps
}) => {
  return (
    <Tooltip title={title} {...otherProps}>
      <img src={infoIcon} width={width} height={height} alt="info" />
    </Tooltip>
  );
};

export default TooltipComponent;
