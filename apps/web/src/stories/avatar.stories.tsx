import { At, Plus } from "../icons";
import { Avatar } from "../ui/avatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "Irere",
    src: "",
    isOnline: true,
  },
};
