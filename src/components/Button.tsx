import { JSX } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

export const Button = (props: {
  children: JSX.Element;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  asA?: boolean; // TODO group with href
  isBack?: boolean;
  handleClick?: (
    e: MouseEvent & { currentTarget: Element; target: Element },
  ) => void;
  href?: string;
  buttonType?: "button" | "submit" | "reset";
}) => {
  return props.asA ? (
    <A
      href={props.href!}
      end
      activeClass={"btn--active"}
      onClick={(e) => {
        props.handleClick?.(e);
      }}
      class={`btn  ${props.isBack ? "btn--back" : ""} ${props.disabled === true ? "btn--disabled" : ""}`}
    >
      {props.children}
    </A>
  ) : (
    <button
      type={props.buttonType || "button"}
      onClick={(e) => {
        props.handleClick?.(e);

        if (props.target) {
          const el: HTMLElement | null = document.querySelector(props.target);
          console.log("el", props.target, el);
          if (el) {
            window.lenis.scrollTo(el, {
              duration: 3,
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
