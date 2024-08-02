/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import SideNavComponent from "./index";

const meta = {
  title: "Design System/Organisms/SideNav",
  component: SideNavComponent,
} satisfies Meta<typeof SideNavComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SideNav: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
