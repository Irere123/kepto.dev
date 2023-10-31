import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../ui/button";
import { Pin, Plus } from "../icons";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Upload",
  },
};

export const Secondary: Story = {
  args: {
    children: "Upload",
    color: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Upload",
    color: "tertiary",
  },
};

export const Error: Story = {
  args: {
    children: "Upload",
    color: "error",
  },
};

export const Warning: Story = {
  args: {
    children: "Upload",
    color: "warning",
    prefix: <Plus />,
    suffix: <Pin />,
  },
};
