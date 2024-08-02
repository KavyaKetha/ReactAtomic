/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import NewCashKickComponent from "./index";

const meta = {
  title: "Design System/Organisms/NewCashKick",
  component: NewCashKickComponent,
} satisfies Meta<typeof NewCashKickComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewCashKick: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
