/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import CashKickSuccessComponent from "./index";

const meta = {
  title: "Design System/Organisms/CashKickSuccessAlert",
  component: CashKickSuccessComponent,
} satisfies Meta<typeof CashKickSuccessComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CashKickSuccessAlert: Story = {
  args: {
    isModalOpen: true,
    setIsModalOpen: () => {},
    // handleCloseModal: () => {},
    // handleModalSubmit: () => {},
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
