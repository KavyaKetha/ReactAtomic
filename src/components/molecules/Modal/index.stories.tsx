/* eslint react/forbid-prop-types: 0 */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import TextField from "../../atoms/TextField";
import ModalComponent from "./index";

const meta = {
  title: "Design System/Molecules/Modal",
  component: ModalComponent,
} satisfies Meta<typeof ModalComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  args: {
    children: <TextField inputLabel="Email Field" />,
    open: true,
    handleClose: () => {},
    handleSubmit: () => {},
    dialogTitle: "Title",
    submitText: "Create",
    cancelText: "Cancel",
    dialogSubtitle: "Subtitle",
    submitDisabled: true,
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "dark", value: "hsla(252, 7%, 13%, 1)" }],
    },
  },
};
