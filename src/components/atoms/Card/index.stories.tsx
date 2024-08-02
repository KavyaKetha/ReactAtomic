/* eslint react/forbid-prop-types: 0 */
/* eslint react/jsx-boolean-value: "off" */

import type { Meta, StoryObj } from "@storybook/react";

import CardComponent from "./index";

const meta = {
  title: "Design System/Atoms/Card",
  component: CardComponent,
} satisfies Meta<typeof CardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    children: "",
  },
  parameters: {
    backgrounds: {
      default: "elvation 2",
      values: [{ name: "elevation 2", value: "#19181C" }],
    },
  },
};
export const CardText: Story = {
  args: {
    children: "Cash Kick",
  },
  parameters: {
    backgrounds: {
      default: "elvation 2",
      values: [{ name: "elevation 2", value: "#19181C" }],
    },
  },
};
