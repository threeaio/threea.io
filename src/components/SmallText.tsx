import { JSX, ParentProps } from "solid-js";
import styles from "./SmallText.module.css";
export const SmallText = (
  props: JSX.HTMLAttributes<HTMLDivElement> & ParentProps,
) => {
  return (
    <div
      class={`font-normal  text-3a-white ${props.class ? props.class : ""} ${styles["small-text"]}`}
    >
      {props.children}
    </div>
  );
};
