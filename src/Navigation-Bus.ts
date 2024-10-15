import { EventBus, createEventBus } from "@solid-primitives/event-bus";
import { createRoot } from "solid-js";

export type LinkType = "link" | "anchor";

export interface BaseNavigationProps {
  type: LinkType;
}

export interface LinkProps extends BaseNavigationProps {
  type: "link";
  href: string;
}
export interface AnchorProps extends BaseNavigationProps {
  type: "anchor";
  target: string;
}

export interface NavigationItem {
  title: string;
  linkProps: LinkProps | AnchorProps;
}

// export interface NavigationItemLink extends BaseNavigationItem {
//   linkProps: LinkProps;
// }
//
// export interface NavigationItemAnchor extends BaseNavigationItem {
//   linkProps: AnchorProps;
// }

export type NavigationConfiguration = {
  onThisPage: NavigationItem[];
  relatedToThisPage: NavigationItem[]; // or section-wise?
};

export let navigationBus: EventBus<NavigationConfiguration>;
createRoot(() => {
  console.log("createRoot");
  navigationBus = createEventBus<NavigationConfiguration>();
});
