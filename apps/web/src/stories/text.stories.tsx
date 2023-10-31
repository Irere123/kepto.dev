import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../ui/text";
import { Pin, Plus } from "../icons";

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextComponent: Story = {
  args: {
    children: (
      <>
        <Text size="6xl">Hello world</Text>
        <Text size="5xl">Hello world</Text>
        <Text size="4xl">Hello world</Text>
        <Text size="3xl">Hello world</Text>
        <Text size="2xl">Hello world</Text>
        <Text size="xl">Hello world</Text>
        <Text size="lg">Hello world</Text>
        <Text size="base">Hello world</Text>
        <Text size="sm">Hello world</Text>
        <Text size="xs">Hello world</Text>
      </>
    ),
  },
};
