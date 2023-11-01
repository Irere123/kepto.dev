import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../ui/input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    placeholder: "Type search...",
  },
};
