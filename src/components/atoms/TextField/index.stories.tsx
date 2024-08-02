/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import TextFieldComponent from "./index";

const meta = {
  title: "Design System/Atoms/TextField",
  component: TextFieldComponent,
} satisfies Meta<typeof TextFieldComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextField: Story = {
  args: {
    placeholder: "Enter data here",
    inputLabel: "Test",
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
export const TextFieldValue: Story = {
  args: {
    value: "Test1",
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
