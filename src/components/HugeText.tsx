import { ParentComponent } from "solid-js";

export const HugeText: ParentComponent = (props) => {
  return (
    <div class="text-3a-white font-display  text-5xl md:text-6xl lg:text-7xl leading-tight">
      {props.children}
    </div>
  );
};
