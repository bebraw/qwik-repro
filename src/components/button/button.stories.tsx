import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button, type ButtonProps } from "./button";

const meta: Meta<ButtonProps> = {
  component: Button,
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Small: Story = {
  args: {
    size: "small",
  },
  render: (props) => <Button {...props}>Some button</Button>,
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
  render: (props) => <Button {...props}>Medium button</Button>,
};

export const Large: Story = {
  args: {
    size: "large",
  },
  render: (props) => <Button {...props}>Large button</Button>,
};
