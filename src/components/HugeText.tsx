import { ParentComponent } from "solid-js";

export const HugeText: ParentComponent = (props) => {
  return (
    <div class="text-3a-white font-display uppercase text-5xl md:text-6xl lg:text-8xl xl:text-[105px] !leading-[.85em]  mb-8">
      {props.children}
    </div>
  );
};
