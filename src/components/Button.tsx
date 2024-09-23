import { JSX } from "solid-js";
import styles from "./Button.module.css";

export const Button = (props: {
  children: JSX.Element;
  asA?: boolean; // TODO group with href
  isBack?: boolean;
  handleClick?: Function;
  href?: string;
}) => {
  return props.asA ? (
    <a
      href={props.href}
      class={` ${styles.btn} ${props.isBack ? styles["btn--back"] : ""}`}
    >
      {props.children}
    </a>
  ) : (
    <button
      onClick={() => props.handleClick?.()}
      class={`py-2 px-4 ${styles.btn}`}
    >
      {props.children}
    </button>
  );
};
