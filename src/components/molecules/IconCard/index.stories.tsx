/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import IconCardComponent from "./index";
import calendar from "../../../assets/icons/calendar.svg";

const meta = {
  title: "Design System/Molecules/IconCard",
  component: IconCardComponent,
} satisfies Meta<typeof IconCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconContentCard: Story = {
  args: {
    iconSrc: calendar,
    title: "Term cap",
    caption: "12 months",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
