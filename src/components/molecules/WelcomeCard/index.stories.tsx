/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import WelcomeCardComponent from "./index";

const meta = {
  title: "Design System/Molecules/WelcomeCard",
  component: WelcomeCardComponent,
} satisfies Meta<typeof WelcomeCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WelcomeCard: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
