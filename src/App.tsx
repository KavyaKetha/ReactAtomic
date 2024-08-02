/* eslint react/jsx-boolean-value: "off" */
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import theme from "./themes/theme";
// import Button from "./components/atoms/Button";
// import Slider from "./components/atoms/Slider";
// import TextField from "./components/atoms/TextField";
// import Avatar from "./components/atoms/Avatar";
// import ToolTip from "./components/atoms/Tooltip";
// import Icon from "./components/atoms/Icon";
// import Chip from "./components/atoms/Chip";
import Typography from "./components/atoms/Typography";
// import TableGrid from "./components/atoms/Table";
// import CustomTabs from "./components/atoms/Tabs";
// import NavButton from "./components/molecules/NavButton";
// import IconCard from "./components/molecules/IconCard";
// import WelcomeCard from "./components/molecules/WelcomeCard";
// import LaunchCashkickCard from "./components/molecules/LaunchCashkickCard";
// import CashAccelerationCard from "./components/molecules/CashAcceleration";
// import CashAcceleration from "./components/organisms/CashAcceleration";
// import Modal from "./components/molecules/Modal";
// import PaymentsTable from "./components/organisms/PaymentsTable";
import NewCashKick from "./components/organisms/NewCashKick";
import SideNav from "./components/organisms/SideNav";

// import profile from "./assets/images/profile.png";
// import cross from "./assets/icons/cross.svg";
// import home from "./assets/icons/home.svg";
// import calendar from "./assets/icons/calendar.svg";

import "./App.css";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Monthly" },
//   { id: 2, lastName: "Lannister", firstName: "Cersei" },
// ];
// const columns = [
//   { field: "id", headerName: "Name", width: 500 },
//   { field: "firstName", headerName: "First name", width: 200 },
// ];
const App: React.FC = () => {
  // const [currentTab, setCurrentTab] = useState("tab1");

  // const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setCurrentTab(newValue);
  // };
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variantType="title">Welcome to My React App</Typography>
        {/* <Button variant="contained" size="large" btnColor="primary">
          Button
        </Button>
        <Slider />
        <Avatar alt="Remy Sharp" src={profile} variant="rounded">
        Test
        </Avatar>
        <ToolTip title="info" />
        <Icon src={cross} color="red" />
        <Chip label="Upcoming" />
        <NavButton iconSrc={home} navText="Home" path="/" />
        <IconCard iconSrc={calendar} title="Term cap" caption="12 months" /> */}
        {/* <TableGrid rows={rows} columns={columns} checkboxSelection={true} /> */}
        {/* <TextField inputLabel="Email Field" />
        <WelcomeCard />
        <Modal
          open={true}
          handleClose={() => {}}
          handleSubmit={() => {}}
          dialogTitle="Name your cash kick"
          submitText="Create cash kick"
          cancelText="Cancel"
          dialogSubtitle="Add a name to identify your cash kick"
        >
          <TextField inputLabel="Email Field" />
        </Modal>
        <div>
          <CustomTabs
            tabs={[
              { label: "My Contracts", value: "tab1" },
              { label: "My Cash Kicks", value: "tab3" },
            ]}
            currentTab={currentTab}
            onChange={handleTabChange}
          />
        </div>
        <CashAccelerationTable
          tabs={[
            { label: "My Contracts", value: "tab1" },
            { label: "My Cash Kicks", value: "tab3" },
          ]}
          currentTab={currentTab}
          onChange={handleTabChange}
        />
        <LaunchCashkickCard /> */}
        {/* <CashAcceleration /> */}
        <NewCashKick />
        <SideNav />
      </Box>
    </ThemeProvider>
  );
};

export default App;
