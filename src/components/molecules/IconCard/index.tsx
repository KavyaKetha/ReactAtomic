import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Icon from "../../atoms/Icon";
import Typography from "../../atoms/Typography";
import Tooltip from "../../atoms/Tooltip";

import { colors } from "../../../constants/theme";

interface CustomIconCardProps {
  iconSrc: string;
  title: string;
  caption: string;
}

const IconCardComponent: React.FC<CustomIconCardProps> = ({
  iconSrc,
  title,
  caption,
  ...otherProps
}) => {
  const StyledIconCard = styled(
    "div",
    {}
  )(() => {
    return {
      ".icon-text-container": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "24px",
        flex: "1 0 0",
        width: "",
        ".icon-container": {
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          borderRadius: "12px",
          border: `1px solid ${colors.borderColor.borderLowEmphasis}`,
          background: `${colors.bgColor.grey100}`,
        },
        ".text-container": {
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
          alignSelf: "stretch",
          ".title-continer": {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            ".tooltip-container": {
              paddingBottom: "3px",
              alignItems: " flex-start",
              gap: "8px",
            },
            ".typograph": {
              overflow: "hidden",
              color: colors.textColor.primary,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
          ".term-container": {
            height: "34px",
            alignSelf: "stretch",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            letterSpacing: "-0.12px",
          },
        },
      },
    };
  });

  return (
    <StyledIconCard title={title} {...otherProps}>
      <Box className="icon-text-container">
        <Box className="icon-container">
          <Icon src={iconSrc} width="40px" height="40px" />
        </Box>
        <Box className="text-container">
          <Box className="title-continer">
            <Typography variantType="body1" className="typograph">
              {title}
            </Typography>
            <span className="tooltip-container">
              <Tooltip title="info" />
            </span>
          </Box>
          <Box className="term-container">
            <Typography variantType="h1" className="term-container">
              {caption}
            </Typography>
          </Box>
        </Box>
      </Box>
    </StyledIconCard>
  );
};

export default IconCardComponent;
