/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import TootltipComponent from "./index";

const meta = {
  title: "Design System/Atoms/Tooltip",
  component: TootltipComponent,
} satisfies Meta<typeof TootltipComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tootltip: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};

export const TooltipInfo: Story = {
  args: {
    title: "Tooltip Info",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
