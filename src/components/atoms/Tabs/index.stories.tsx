/* eslint react/forbid-prop-types: 0 */
/* eslint react/jsx-boolean-value: "off" */

import type { Meta, StoryObj } from "@storybook/react";

import TabsComponent from "./index";

const meta = {
  title: "Design System/Atoms/Tabs",
  component: TabsComponent,
} satisfies Meta<typeof TabsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tabs: Story = {
  args: {
    tabs: [
      { label: "My Contracts", value: "tab1" },
      { label: "My Cash Kicks", value: "tab3" },
    ],
    currentTab: "tab1",
    onChange: () => {},
  },
  parameters: {
    backgrounds: {
      default: "elvation 1",
      values: [{ name: "elevation 1", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
