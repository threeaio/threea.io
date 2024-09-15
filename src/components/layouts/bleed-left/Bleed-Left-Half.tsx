import {children, JSX} from "solid-js";
import {GridSpacer1} from "~/components/layouts/Grid-Spacer-1";

export const BleedLeftHalf = (props: JSX.HTMLAttributes<HTMLDivElement> & {
  Left: JSX.Element | undefined;
  Right: JSX.Element | undefined;
},) => {

  const Left = children(() => props.Left);
  const Right = children(() => props.Right);

  return (
    <div class="grid grid-cols-26 w-full">
      <div class="col-span-full sm:col-span-13 xl:col-span-13">
        {Left()}
      </div>
      <div class="col-start-2 sm:col-start-0 col-span-24 sm:col-span-11 xl:col-span-9">
        {Right()}
      </div>
    </div>

  );
}
