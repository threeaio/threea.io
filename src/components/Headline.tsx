import { ParentComponent } from "solid-js";

export const Headline: ParentComponent = (props) => {
  return (
    <div class="text-3a-white font-display text-xl xl:text-2xl leading-tight">
      {props.children}
    </div>
  );
};
