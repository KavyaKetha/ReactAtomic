import React from "react";
import Slider, { SliderProps } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

interface CustomSliderProps extends SliderProps {
  valueLabelDisplay?: SliderProps["valueLabelDisplay"];
  value?: SliderProps["value"];
  step?: SliderProps["step"];
  onChange?: SliderProps["onChange"];
}
const SliderComponent: React.FC<CustomSliderProps> = ({
  value,
  step,
  onChange,
  valueLabelDisplay = "off",
  ...otherProps
}) => {
  const StyledSlider = styled(
    Slider,
    {}
  )<CustomSliderProps>(({ theme }) => {
    return {
      "& .MuiSlider-rail": {
        height: "8px",
        borderRadius: "8px",
        backgroundColor: "#3A3A3D",
      },
      "& .MuiSlider-track": {
        height: "8px",
        borderRadius: "8px",
        padding: "0px, 59px, 0px, 59px",
      },
      "& .MuiSlider-thumb": {
        height: "23px",
        width: "23px",
        border: `3px solid ${theme.palette.primary.light}`,
        borderRadius: "8px",
        boxShadow: "0px 4px 4px 0px #100C2E99",
      },
    };
  });
  return (
    <StyledSlider
      aria-label="Default"
      valueLabelDisplay={valueLabelDisplay}
      value={value}
      color="primary"
      step={step}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default SliderComponent;
