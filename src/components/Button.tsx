import { JSX } from "solid-js";
import { A } from "@solidjs/router";

export const Button = (props: {
  children: JSX.Element;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  asA?: boolean; // TODO group with href
  isBack?: boolean;
  handleClick?: Function;
  href?: string;
  buttonType?: "button" | "submit" | "reset";
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
      type={props.buttonType || "button"}
      onClick={() => {
        props.handleClick?.();

        if (props.target) {
          const el: HTMLElement | null = document.querySelector(props.target);
          if (el) {
            window.lenis.scrollTo(el, {
              duration: 2,
            });
          }
        }
      }}
      class={`btn  ${props.isBack ? "btn--back" : ""} ${props.disabled === true ? "btn--disabled" : ""}`}
    >
      {props.children}
    </button>
  );
};
