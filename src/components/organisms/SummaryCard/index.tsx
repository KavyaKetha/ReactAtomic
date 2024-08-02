import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Card from "../../atoms/Card";
import Typography from "../../atoms/Typography";
import Tooltip from "../../atoms/Tooltip";
import Button from "../../atoms/Button";
import Slider from "../../atoms/Slider";

import CashKickAlert from "../CashKickAlert";

import { SummaryProps } from "../../../interfaces/CashKick";

import theme from "../../../themes/theme";

const SummaryCardComponent: React.FC<SummaryProps> = ({
  isReviewed = false,
  selectedContracts = [],
  handleReview,
}) => {
  const StyledPayments = styled(
    "div",
    {}
  )(() => {
    return {
      ".ncc-content-container": {
        display: "flex",
        gap: "20px",
        width: "100%",
        ".ncc-summary-container": {
          display: "flex",
          width: "276px",
          height: "449px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        },
        ".h-stack": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          alignSelf: "stretch",
          width: "100%",
          color: theme.palette.textColor.lowEmphasis,
        },
        ".meta-data": {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          alignSelf: "stretch",
        },
        ".left-text": {
          flex: " 1 0 0",
          color: theme.palette.textColor.lowEmphasis,
        },
        ".right-text": {
          textAlign: "right",
        },
        hr: {
          width: "100%",
          height: "1px",
          background: theme.palette.borderColor.borderHighEmphasis,
          border: "none",
        },
      },
    };
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <StyledPayments>
      <Box className="ncc-content-container">
        <Card className="ncc-summary-container">
          <Typography variantType="h1">
            Summary{"  "}
            <span>
              <Tooltip title="Info" />
            </span>
          </Typography>
          <Box sx={{ width: "100%" }} className="h-stack">
            <Box className="meta-data">
              <Typography variantType="body1" className="left-text">
                Term
              </Typography>
              <Typography
                variantType="body1"
                sx={{
                  textAlign: "right",
                }}
              >
                12 months
              </Typography>
            </Box>
            <Box className="meta-data">
              <Typography variantType="body1" className="left-text">
                Selected contracts
              </Typography>
              <Typography
                variantType="body1"
                sx={{
                  textAlign: "right",
                }}
              >
                {selectedContracts.length}
              </Typography>
            </Box>
            {!isReviewed && (
              <>
                <Box className="meta-data">
                  <Typography variantType="body1" className="left-text">
                    Slide to autoselect{" "}
                  </Typography>
                  <Button size="small" btnColor="teritary">
                    Reset
                  </Button>
                </Box>
                <Slider />
                <Typography variantType="body1" className="left-text">
                  <span style={{ color: theme.palette.primary.light }}>
                    $283,442.64{" "}
                  </span>
                  selected of{" "}
                  <span className="bold-number" style={{ fontWeight: 500 }}>
                    $880,000.00
                  </span>
                </Typography>
              </>
            )}
            <Box className="meta-data">
              <Typography variantType="body1" className="left-text">
                Pay back amount{" "}
              </Typography>
              <Typography variantType="body1" className="right-text">
                $288,003.30{" "}
              </Typography>
            </Box>
            <Box className="meta-data">
              <Typography variantType="body1" className="left-text">
                Rate %
              </Typography>
              <Typography
                variantType="caption"
                className="right-text"
                sx={{ color: theme.palette.textColor.lowEmphasis }}
              >
                (12.00%) <span className="bold-number">$34,560.56 </span>
              </Typography>
            </Box>
            <hr />
            <Box className="meta-data">
              <Typography className="left-text h3">Total Payout </Typography>
              <Typography variantType="h2" className="right-text">
                $253,442.50
              </Typography>
            </Box>
            {!isReviewed ? (
              <Button
                size="large"
                sx={{ width: "100%" }}
                disabled={selectedContracts.length < 1}
                onClick={handleReview}
              >
                Review your credit
              </Button>
            ) : (
              <Button
                size="large"
                sx={{ width: "100%" }}
                disabled={selectedContracts.length < 1}
                onClick={handleSubmit}
              >
                Submit your credit
              </Button>
            )}
          </Box>
        </Card>
      </Box>
      <CashKickAlert
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </StyledPayments>
  );
};

export default SummaryCardComponent;
