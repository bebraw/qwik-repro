import { component$, Slot } from "@builder.io/qwik";

export interface ButtonProps {
  size?: "small" | "medium" | "large";
}
export const Button = component$<ButtonProps>(({ size = "medium" }) => {
  const sizeMap = {
    small: "sm",
    medium: "md",
    large: "lg",
  };

  return (
    <button
      class={{
        [`bg-red-200 text-${sizeMap[size]}`]: true,
      }}
    >
      <Slot></Slot>
    </button>
  );
});
