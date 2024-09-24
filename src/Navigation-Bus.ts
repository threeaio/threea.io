import { EventBus, createEventBus } from "@solid-primitives/event-bus";
import { createRoot } from "solid-js";

export type NavigationItem = {
  href: string;
  title: string;
};

export type NavigationConfiguration = {
  onThisPage: NavigationItem[];
  relatedToThisPage: NavigationItem[]; // or section-wise?
};

export let navigationBus: EventBus<NavigationConfiguration>;
createRoot(() => {
  navigationBus = createEventBus<NavigationConfiguration>();
});
