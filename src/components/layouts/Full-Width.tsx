import { JSX, ParentProps } from "solid-js";

export const FullWidth = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <div ref={props.ref} class={`grid grid-cols-26 w-full ${props.class}`}>
      <div class="col-span-24 col-start-2 sm:col-span-22 sm:col-start-3 xl:col-span-18 xl:col-start-5">
        {props.children}
      </div>
    </div>
  );
};
