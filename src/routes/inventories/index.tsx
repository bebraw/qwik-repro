import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  // 1. Fetch all inventories
  // 2. Render each inventory one by one
  return <div>all inventories go here</div>;
});

export const head: DocumentHead = {
  title: "Welcome to a page listing all inventories",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
