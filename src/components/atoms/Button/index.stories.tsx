/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import ButtonComponent from "./index";

const meta = {
  title: "Design System/Atoms/Button",
  component: ButtonComponent,
} satisfies Meta<typeof ButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    children: "Button",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};

export const Primary: Story = {
  args: {
    children: "Button",
    size: "large",
    btnColor: "primary",
    variant: "contained",
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
export const Secondary: Story = {
  args: {
    children: "Button",
    size: "large",
    btnColor: "secondary",
    variant: "contained",
  },
};
export const Teritary: Story = {
  args: {
    children: "Button",
    size: "large",
    btnColor: "teritary",
    variant: "contained",
  },
};
export const Text: Story = {
  args: {
    children: "Button",
    size: "large",
    btnColor: "text",
    variant: "text",
  },
};
