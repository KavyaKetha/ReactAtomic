/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import IconComponent from "./index";
import cross from "../../../assets/icons/cross.svg";

const meta = {
  title: "Design System/Atoms/Icon",
  component: IconComponent,
} satisfies Meta<typeof IconComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    src: cross,
  },
  parameters: {
    backgrounds: {
      default: "elvation 1",
      values: [{ name: "elevation 1", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
export const IconLarge: Story = {
  args: {
    src: cross,
    width: "200px",
    height: "200px",
  },
  parameters: {
    backgrounds: {
      default: "elvation 1",
      values: [{ name: "elevation 1", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
