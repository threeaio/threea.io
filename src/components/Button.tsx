import { JSX } from "solid-js";
import styles from "./Button.module.css";
import { ChildProps } from "postcss";
import b from "@studio-freight/lenis";

export const Button = (props: {
  children: JSX.Element;
  asA?: boolean;
  isBack?: boolean;
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
    <button class={`py-2 px-4 ${styles.btn}`}>{props.children}</button>
  );
};
