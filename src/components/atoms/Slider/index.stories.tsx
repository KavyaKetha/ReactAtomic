/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import SliderComponent from "./index";

const meta = {
  title: "Design System/Atoms/Slider",
  component: SliderComponent,
} satisfies Meta<typeof SliderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slider: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: "elvation 1",
      values: [{ name: "elevation 1", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
export const SliderValue: Story = {
  args: {
    defaultValue: 50,
  },
  parameters: {
    backgrounds: {
      default: "elvation 1",
      values: [{ name: "elevation 1", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
