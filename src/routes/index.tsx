import { promises as fs } from "fs";
import { component$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, routeAction$ } from "@builder.io/qwik-city";

import Inventory, { type Items } from "~/components/inventory/inventory";

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

export const useSetInventory = routeAction$(async (items) => {
  console.log("write to fs now", items);

  try {
    await fs.writeFile("inventory.txt", JSON.stringify(items, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write inventory");

    return {
      success: false,
    };
  }

  return {
    success: true,
  };
});

export default component$(() => {
  const inventorySignal = useLoadInventory();
  const setInventory = useSetInventory();

  return (
    <div>
      <Inventory
        title="socks"
        initialItems={inventorySignal.value}
        onItemsChanged={$((inventory: Items) => setInventory.submit(inventory))}
      />
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
