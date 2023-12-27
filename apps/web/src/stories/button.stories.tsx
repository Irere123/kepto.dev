import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@kepto/ui";

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
    text: "Upload",
  },
};

export const Secondary: Story = {
  args: {
    text: "Upload",
    variant: "secondary",
  },
};
