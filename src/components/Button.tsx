import { JSX } from "solid-js";
import { A } from "@solidjs/router";

export const Button = (props: {
  children: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  asA?: boolean; // TODO group with href
  isBack?: boolean;
  handleClick?: Function;
  href?: string;
}) => {
  return props.asA ? (
    <A
      href={props.href!}
      end
      activeClass={"btn--active"}
      class={`btn  ${props.isBack ? "btn--back" : ""} ${props.disabled === true ? "btn--disabled" : ""}`}
    >
      {props.children}
    </A>
  ) : (
    <button
      onClick={() => props.handleClick?.()}
      class={`btn  ${props.isBack ? "btn--back" : ""} ${props.disabled === true ? "btn--disabled" : ""}`}
    >
      {props.children}
    </button>
  );
};
