/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import AvatarComponent from "./index";
import profile from "../../../assets/images/profile.png";

const meta = {
  title: "Design System/Atoms/Avatar",
  component: AvatarComponent,
} satisfies Meta<typeof AvatarComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  args: {
    children: "Avatar",
    src: profile,
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
export const AvatarRounded: Story = {
  args: {
    children: "Avatar",
    src: profile,
    variant: "rounded",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
