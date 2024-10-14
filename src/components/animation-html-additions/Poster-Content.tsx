import { ParentProps } from "solid-js";
import { PosterTextHeadline } from "~/components/animation-html-additions/Poster-Headline";

export function PosterContentBeethoven(props: ParentProps) {
  // return <></>;
  return (
    <>
      <span class="absolute origin-bottom-right scale-100 md:scale-75 xl:scale-100 right-2/3 bottom-1/3  pb-4">
        <PosterTextHeadline>
          <span class={"whitespace-nowrap"}>{props.children}</span>
        </PosterTextHeadline>
      </span>
      <span class="absolute left-1/3 top-2/3 origin-top-left scale-100 md:scale-75 xl:scale-100">
        <span class={"grid gap-1 mix-blend-multiply opacity-20"}>
          <span class={"bg-3a-black h-1 w-12"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
          <span class={"bg-3a-black h-1 w-16"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
          <span class={"bg-3a-black h-1 w-12"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
          <span class={"bg-3a-black h-1 w-16"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
        </span>
      </span>
    </>
  );
}
