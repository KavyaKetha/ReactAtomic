/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import PaymentsComponent from "./index";

const meta = {
  title: "Design System/Organisms/YourPayments",
  component: PaymentsComponent,
} satisfies Meta<typeof PaymentsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const YourPayments: Story = {
  args: {
    // tableData: {
    //   width: "1011px",
    //   height: "400px",
    //   rows: [
    //     { id: 1, lastName: "Snow", firstName: "Jon" },
    //     { id: 2, lastName: "Lannister", firstName: "Cersei" },
    //   ],
    //   columns: [
    //     { field: "id", headerName: "ID" },
    //     { field: "firstName", headerName: "First name" },
    //   ],
    //   checkboxSelection: false,
    // },
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
