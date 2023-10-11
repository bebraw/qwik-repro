import { promises as fs } from "fs";
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import Inventory from "~/components/inventory/inventory";

export const useLoadInventory = routeLoader$(async () => {
  // This code runs only on the server, after every navigation
  try {
    const items = JSON.parse(
      await fs.readFile("inventory.txt", { encoding: "utf-8" })
    );

    return items as string[];
  } catch (error) {
    // TODO: Figure out what to do now
  }

  return [];
});

export default component$(() => {
  const inventorySignal = useLoadInventory();

  return (
    <div>
      <Inventory title="socks" initialItems={inventorySignal.value} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
