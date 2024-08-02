/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import ChipComponent from "./index";

const meta = {
  title: "Design System/Atoms/Chip",
  component: ChipComponent,
} satisfies Meta<typeof ChipComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chip: Story = {
  args: {
    label: "Available",
  },
  parameters: {
    backgrounds: {
      default: "elvation 1",
      values: [{ name: "elevation 1", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
