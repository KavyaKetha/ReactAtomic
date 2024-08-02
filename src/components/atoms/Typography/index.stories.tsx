/* eslint react/forbid-prop-types: 0 */

import type { Meta, StoryObj } from "@storybook/react";

import TypographyComponent from "./index";

const meta = {
  title: "Design System/Atoms/Typography",
  component: TypographyComponent,
} satisfies Meta<typeof TypographyComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TypographyTitle: Story = {
  args: {
    variantType: "title",
    children: "Typography Title",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};

export const TypographyH1: Story = {
  args: {
    children: "Typography Title",
    variantType: "h1",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};

export const TypographyH2: Story = {
  args: {
    children: "Typography Title",
    variantType: "h2",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};

export const TypographyBody1: Story = {
  args: {
    children: "Typography Title",
    variantType: "body1",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
export const TypographyBody2: Story = {
  args: {
    children: "Typography Title",
    variantType: "body2",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
export const TypographyCaption: Story = {
  args: {
    children: "Typography Title",
    variantType: "caption",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
