import { JSX } from "solid-js";
import { NavigationItem } from "~/Navigation-Bus";

export interface BasicTextContent {
  titleSeo: string;
  headline: () => JSX.Element;
  teaser: () => JSX.Element;
  text: () => JSX.Element;
  moreLink: NavigationItem;
}
