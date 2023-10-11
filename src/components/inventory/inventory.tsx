// import { component$, useSignal, $ } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

export default component$(
  ({ title, initialItems }: { title: string; initialItems: string[] }) => {
    const items = useSignal<string[]>(initialItems);
    const itemCount = useSignal<number>(initialItems.length);
    const inputRef = useSignal<HTMLInputElement>();

    useTask$(({ track }) => {
      track(() => items.value);

      if (!isServer) {
        itemCount.value = items.value.length;

        // console.log(`Items were changed: ${items.value.toString()}`);
      }
    });

    return (
      <div>
        <div>
          {title}: {itemCount}
        </div>
        <ul>
          {items.value.map((item, i) => (
            <li>
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
  }
);
