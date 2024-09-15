import { JSX } from "solid-js";
import styles from "./Button.module.css";
import { ChildProps } from "postcss";

export const Button = (props: {
  children: JSX.Element;
  asA?: boolean;
  href?: string;
}) => {
  console.log("styles", styles);
  return props.asA ? (
    <a href={props.href} class={`py-3 px-6 ${styles.btn}`}>
      {props.children}
    </a>
  ) : (
    <button class={`py-2 px-4 ${styles.btn}`}>{props.children}</button>
  );
};
