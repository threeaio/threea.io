import {
  Accessor,
  Context,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentProps,
  useContext,
} from "solid-js";

import { createContext } from "solid-js";
import { makeResizeObserver } from "@solid-primitives/resize-observer";
import StartEndFunc = ScrollTrigger.StartEndFunc;

export const AnimationContext: Context<
  | {
      progress: Accessor<number>;
      velocity: Accessor<number>;
      active: Accessor<boolean>;
      width: Accessor<number>;
      height: Accessor<number>;
    }
  | undefined
> = createContext();

export const useAnimationWrapperContext = () => {
  const context = useContext(AnimationContext);
  if (!context) throw new Error("AnimationContext is not valid");
  return context;
};

export default function CanvasAnimationWrapper(
  props: ParentProps & {
    animation: JSX.Element;
    start?: string | number | StartEndFunc;
    end?: string | number | StartEndFunc;
  },
) {
  const [progress, setProgress] = createSignal(0);
  const [active, setActive] = createSignal(false);
  const [velocity, setVelovity] = createSignal(0);
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  const { observe } = makeResizeObserver(setupContentResizeObserver, {
    box: "content-box",
  });
  function setupContentResizeObserver(entries: ResizeObserverEntry[]) {
    const cr = entries[0].contentRect;
    setHeight(cr.height);
    setWidth(cr.width);
  }

  let animationParent: HTMLDivElement | undefined;

  let scrollTriggerHere: ScrollTrigger | undefined;
  onCleanup(() => {
    if (scrollTriggerHere) {
      scrollTriggerHere.kill();
    }
  });
  onMount(() => {
    if (!animationParent) {
      return;
    }
    scrollTriggerHere = window.scrollTrigger.create({
      trigger: animationParent,
      start: props.start || "top top",
      end: props.end || "bottom bottom-=50%",
      // markers: true,
      onToggle: (self) => {
        setActive(self.isActive);
      },
      onUpdate: (self) => {
        setProgress(self.progress);
        setVelovity(self.getVelocity());
      },
    });
  });

  return (
    <AnimationContext.Provider
      value={{
        progress,
        active,
        velocity,
        width,
        height,
      }}
    >
      <div
        class="relative"
        ref={(el) => {
          animationParent = el;
          observe(animationParent);
        }}
      >
        {props.animation}
        <div class="relative">{props.children}</div>
      </div>
    </AnimationContext.Provider>
  );
}
