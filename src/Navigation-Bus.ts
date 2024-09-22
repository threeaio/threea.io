import { EventBus, createEventBus } from "@solid-primitives/event-bus";
import { createRoot } from "solid-js";

export let navigationBus: EventBus<string>;
createRoot(() => {
  navigationBus = createEventBus<string>();
});
