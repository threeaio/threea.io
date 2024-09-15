import { JSX, ParentProps } from "solid-js";
import styles from "./SmallText.module.css";
export const SmallText = (
  props: JSX.HTMLAttributes<HTMLDivElement> & ParentProps,
) => {
  return (
    <div
      class={`3a-text-small font-extralight text-sm text-3a-white md:pr-12 ${props.class ? props.class : ""} ${styles["small-text"]}`}
    >
      {props.children}
    </div>
  );
};
