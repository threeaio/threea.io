import { ParentComponent } from "solid-js";

export const LandingPageSectionTitle: ParentComponent = (props) => {
  return (
    <h2 class="tile-heading font-extralight text-sm text-3a-green mb-6">
      {props.children}
    </h2>
  );
};
