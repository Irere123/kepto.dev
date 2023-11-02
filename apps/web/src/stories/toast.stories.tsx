import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "../ui/toast";
import { Notification } from "../icons";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    message: "Hello world",
  },
};
