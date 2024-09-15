import { ParentComponent } from "solid-js";

export const FullWidth: ParentComponent = (props) => {
  return (
    <div class="grid grid-cols-26 w-full">
      <div class="col-span-24 col-start-2 sm:col-span-22 sm:col-start-3 xl:col-span-18 xl:col-start-5">
        {props.children}
      </div>
    </div>
  );
};
