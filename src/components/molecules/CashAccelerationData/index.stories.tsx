/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import CashAccelerationComponent from "./index";

const meta = {
  title: "Design System/Molecules/CashAccelerationCard",
  component: CashAccelerationComponent,
} satisfies Meta<typeof CashAccelerationComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CashAccelerationCard: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
