import { At, Plus } from "../icons";
import { Badge } from "../ui/badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    children: "Hello world",
    variant: "blue",
  },
};

export const Amber: Story = {
  args: {
    children: "Hello world",
    size: "medium",
    variant: "amber",
  },
};

export const Gray: Story = {
  args: {
    children: "typescript",
    size: "small",
    variant: "gray",
    suffix: <Plus />,
  },
};

export const BadgeWithPrefix: Story = {
  args: {
    children: "hello",
    size: "medium",
    preffix: <Plus />,
  },
};
