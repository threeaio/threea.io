import { ParentComponent } from "solid-js";

export const Headline: ParentComponent = (props) => {
  return (
    <div class="text-3a-white font-display uppercase text-xl xl:text-2xl !leading-[.85em] mb-4">
      {props.children}
    </div>
  );
};
