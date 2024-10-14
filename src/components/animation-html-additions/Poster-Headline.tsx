import { ParentProps } from "solid-js";

export function PosterTextHeadline(props: ParentProps) {
  return (
    <span class="block text-sm 2xl:text-base text-3a-gray-darker font-display text-right !leading-tight lowercase">
      {props.children}
    </span>
  );
}
