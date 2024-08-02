/* eslint dot-notation: "off" */
/* eslint @typescript-eslint/dot-notation: "off" */
/*  @typescript-eslint/dot-notation: "off" */
/* dot-notation: "off" */
import type { Meta, StoryObj } from "@storybook/react";

import CashKickAlertComponent from "./index";

const meta = {
  title: "Design System/Organisms/CashKickCreateAlert",
  component: CashKickAlertComponent,
} satisfies Meta<typeof CashKickAlertComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CashKickCreateAlert: Story = {
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
