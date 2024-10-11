import { children, JSX } from "solid-js";
import { GridSpacer1 } from "~/components/layouts/Grid-Spacer-1";

export const BleedRightSmall = (
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    Left: JSX.Element | undefined;
    Right: JSX.Element | undefined;
  },
) => {
  const Left = children(() => props.Left);
  const Right = children(() => props.Right);

  return (
    <div class={`grid grid-cols-26 w-full ${props.class}`}>
      <div class="col-span-24 col-start-2 sm:col-start-3 xl:col-start-5 sm:col-span-11 xl:col-span-12">
        {Left()}
      </div>
      <div class="col-span-full sm:col-span-13 xl:col-span-10">{Right()}</div>
    </div>
  );
};
