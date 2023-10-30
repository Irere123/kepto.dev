import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import { create } from "@storybook/theming/create";
import "../src/app/index.css";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
} satisfies Preview;

export default preview;
