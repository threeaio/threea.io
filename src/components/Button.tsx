import { JSX } from "solid-js";
import { A } from "@solidjs/router";

export const Button = (props: {
  children: JSX.Element;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  asA?: boolean; // TODO group with href
  isBack?: boolean;
  handleClick?: (e: {
    currentTarget: Element;
    target: Element;
    preventDefault: () => void;
  }) => void;
  href?: string;
  buttonType?: "button" | "submit" | "reset";
}) => {
  const handleClick = (e: {
    currentTarget: Element;
    target: Element;
    preventDefault: () => void;
  }) => {
    props.handleClick?.(e);
    if (props.target) {
      const el: HTMLElement | null = document.querySelector(props.target);
      if (el) {
        window.lenis.scrollTo(el, {
          duration: 3,
        });
      }
    }
  };

  return props.asA ? (
    <A
      href={props.href!}
      end
      activeClass={"btn--active"}
      onPointerUp={(e) => {
        props.handleClick?.(e);
      }}
      class={`btn  ${props.isBack ? "btn--back" : ""} ${props.disabled === true ? "btn--disabled" : ""}`}
    >
      {props.children}
    </A>
  ) : (
    <button
      type={props.buttonType || "button"}
      onPointerUp={handleClick}
      class={`btn  ${props.isBack ? "btn--back" : ""} ${props.disabled === true ? "btn--disabled" : ""}`}
    >
      {props.children}
    </button>
  );
};
