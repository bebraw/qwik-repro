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
    <div class="m-4 bg-gray-500">
      <button
        class={{
          [`bg-red-200 text-${sizeMap[size]}`]: true,
        }}
      >
        <Slot></Slot>
      </button>
    </div>
  );
});
