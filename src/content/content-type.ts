import { JSX } from "solid-js";
import { NavigationItem } from "~/Navigation-Bus";

export interface ContentType {
  titleSeo: string;
  headline: JSX.Element;
  teaser: JSX.Element;
  text: JSX.Element;
  moreLink: NavigationItem;
}
