/* eslint react/forbid-prop-types: 0 */
/* eslint react/jsx-boolean-value: "off" */

import type { Meta, StoryObj } from "@storybook/react";

import TableComponent from "./index";

const meta = {
  title: "Design System/Atoms/Table",
  component: TableComponent,
} satisfies Meta<typeof TableComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Table: Story = {
  args: {
    rows: [
      { id: 1, lastName: "Snow", firstName: "Jon" },
      { id: 2, lastName: "Lannister", firstName: "Cersei" },
    ],
    columns: [
      { field: "id", headerName: "ID", width: 100 },
      { field: "firstName", headerName: "First name", width: 500 },
    ],
    checkboxSelection: true,
    width: "1011px",
    height: "400px",
  },
  parameters: {
    backgrounds: {
      default: "elvation 1",
      values: [{ name: "elevation 1", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
