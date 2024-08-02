/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import BrandComponent from "./index";

const meta = {
  title: "Design System/Molecules/Brand",
  component: BrandComponent,
} satisfies Meta<typeof BrandComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
