import {
  Accessor,
  Context,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentProps,
  Show,
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
  const [target, setTarget] = createSignal<HTMLElement | undefined>();
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

  let scrollTriggerHere: ScrollTrigger | undefined;
  onCleanup(() => {
    if (scrollTriggerHere) {
      scrollTriggerHere.kill();
    }
  });
  onMount(() => {
    if (!target()) {
      return;
    }
    scrollTriggerHere = window.scrollTrigger.create({
      trigger: target(),
      start: props.start || "clamp(top top)",
      end: props.end || "clamp(bottom bottom-=10%)",
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
        class="relative h-full w-full"
        ref={(el) => {
          setTarget(el);
          observe(el);
        }}
      >
        <Show when={width() && height()}>{props.animation}</Show>
        <div class="relative">{props.children}</div>
      </div>
    </AnimationContext.Provider>
  );
}
