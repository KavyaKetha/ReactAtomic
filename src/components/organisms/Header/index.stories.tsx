/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import HeaderComponent from "./index";

const meta = {
  title: "Design System/Organisms/Header",
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Header: Story = {
  args: {
    title: "New cash kick",
    caption: "Let’s setup a new cash kick to power your Saas",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
