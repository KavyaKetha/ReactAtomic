/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import CashAccelerationComponent from "./index";

const meta = {
  title: "Design System/Organisms/CashAcceleration",
  component: CashAccelerationComponent,
} satisfies Meta<typeof CashAccelerationComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CashAcceleration: Story = {
  args: {
    tabs: [
      { label: "My Contracts", value: "tab1" },
      { label: "My Cash Kicks", value: "tab3" },
    ],
    currentTab: "tab1",
    onChange: () => {},
    tableData: {
      width: "1011px",
      rows: [
        { id: 1, lastName: "Snow", firstName: "Jon" },
        { id: 2, lastName: "Lannister", firstName: "Cersei" },
      ],
      columns: [
        { field: "id", headerName: "ID" },
        { field: "firstName", headerName: "First name" },
      ],
      checkboxSelection: false,
    },
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
