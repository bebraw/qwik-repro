// import { component$, useSignal, $ } from "@builder.io/qwik";
import { component$, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

export type Items = string[];

export default component$(
  ({
    title,
    initialItems,
    onItemsChanged,
  }: {
    title: string;
    initialItems: Items;
    onItemsChanged: QRL<(items: Items) => unknown>;
  }) => {
    const items = useSignal<string[]>(initialItems);
    const itemCount = useSignal<number>(initialItems.length);
    const inputRef = useSignal<HTMLInputElement>();

    useTask$(({ track }) => {
      track(() => items.value);

      if (!isServer) {
        itemCount.value = items.value.length;

        onItemsChanged(items.value);
        // console.log(`Items were changed: ${items.value.toString()}`);
      }
    });

    return (
      <div class="m-4">
        <div>
          {title}: {itemCount}
        </div>
        <ul class="m-2 flex flex-row gap-8">
          {items.value.map((item, i) => (
            <li key={item}>
              {item}{" "}
              <button
                onClick$={() => {
                  // Investigate a lighter solution
                  // items.value = items.value.splice(i, 1);

                  items.value = items.value
                    .slice(0, i)
                    .concat(items.value.slice(i + 1));
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>

        <div>
          <label>
            Add an item
            <input ref={inputRef} type="text"></input>
            <button
              onClick$={() => {
                const $input = inputRef.value;

                if (!$input) {
                  return;
                }

                items.value = items.value.concat($input.value);

                $input.value = "";
              }}
            >
              Add
            </button>
          </label>
        </div>
      </div>
    );
  },
);
