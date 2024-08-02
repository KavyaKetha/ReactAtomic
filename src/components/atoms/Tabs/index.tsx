import React from "react";
import { styled } from "@mui/material/styles";
import { Tabs, Tab, TabsProps, TabProps } from "@mui/material";

export interface CustomTabsProps extends TabsProps {
  tabs: Array<{ label: string; value: string }>;
  currentTab: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const StyledTabs = styled(Tabs)(() => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
}));

const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    marginRight: "8px",
    border: `1px ${theme.palette.primary.light} solid`,
    padding: "12px 24px 12px 24px",
    borderRadius: "12px",
    height: "43px",
    opacity: "0px",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "19px",

    "&:hover": {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: theme.palette.primary.light,
    },
    "&.Mui-focusVisible": {
      backgroundColor: theme.palette.primary.main,
    },
  })
);
const TabsComponent: React.FC<CustomTabsProps> = (props) => {
  const { tabs, currentTab, onChange, ...otherProps } = props;

  return (
    <StyledTabs value={currentTab} onChange={onChange} {...otherProps}>
      {tabs.map((tab) => (
        <StyledTab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </StyledTabs>
  );
};

export default TabsComponent;
