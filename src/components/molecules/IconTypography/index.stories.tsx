/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import IconTypographyComponent from "./index";
import home from "../../../assets/icons/home.svg";

const meta = {
  title: "Design System/Organisms/IconTypography",
  component: IconTypographyComponent,
} satisfies Meta<typeof IconTypographyComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NavMenuItem: Story = {
  args: {
    // path: "/",
    iconSrc: home,
    text: "Home",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
