import {
  Accessor,
  Context,
  createEffect,
  createRenderEffect,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentProps,
  Show,
  useContext,
} from "solid-js";
import { createContext } from "solid-js";
import StartEndFunc = ScrollTrigger.StartEndFunc;
import { createElementSize } from "@solid-primitives/resize-observer";

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

export default function CanvasScrollAnimationWrapper(
  props: ParentProps & {
    animation: JSX.Element;
    start?: string | number | StartEndFunc;
    end?: string | number | StartEndFunc;
  },
) {
  const [target, setTarget] = createSignal<HTMLElement | undefined>();
  const size = createElementSize(target);
  const [progress, setProgress] = createSignal(0);
  const [active, setActive] = createSignal(false);
  const [velocity, setVelovity] = createSignal(0);
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  let scrollTriggerHere: ScrollTrigger | undefined;
  createEffect(() => {
    setWidth(size.width || 0); // => number | null
    setHeight(size.height || 0); // => number | null
    if (scrollTriggerHere) {
      scrollTriggerHere.refresh();
    }
  });

  onMount(() => {
    scrollTriggerHere = window.scrollTrigger.create({
      trigger: target(),
      invalidateOnRefresh: true,
      start: props.start || "clamp(top top)",
      end: props.end || "clamp(bottom bottom)",
      // markers: true,
      onToggle: (self) => {
        setActive(self.isActive);
      },
      onUpdate: (self) => {
        setProgress(self.progress);
        setVelovity(self.getVelocity());
      },
    });
    onCleanup(() => {
      if (scrollTriggerHere) {
        scrollTriggerHere.kill();
      }
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
        id={Math.random() * 10000 + "-animation"}
        class={"h-full w-full"}
        ref={(el) => setTarget(el)}
      >
        <div class="absolute inset-0 ">
          <div class="sticky inset-0 ">
            {/*<Show when={activet()}>{props.animation}</Show>*/}
            {props.animation}
          </div>
        </div>
        <div class="relative">{props.children}</div>
      </div>
    </AnimationContext.Provider>
  );
}
