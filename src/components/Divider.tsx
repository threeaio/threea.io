import { fromLandingPageState } from "~/landing-page-state";

export const Divider = () => {
  const [{ landingPageState }] = fromLandingPageState;
  return (
    <figure class="py-24 text-center" aria-hidden="true">
      <figcaption class="hidden">
        A Figure dispalying the current Scroll-Progress and Scroll-Speed
      </figcaption>
      <div class="overflow-x-hidden inline-block p-3 text-sm font-extralight text-3a-green play bg-3a-gray-darker rounded">
        {landingPageState.totalContentHeight.toFixed(2).padStart(6, "0")}{" "}
        <span class="text-3a-white">/// </span>
        {Math.abs(landingPageState.velocity).toFixed(2).padStart(6, "0")}{" "}
        <span class="text-3a-white">/// </span>
        {landingPageState.progress.toFixed(2).padStart(6, "0")}
        {/*<div class="h-2 bg-3a-green  w-[200%]" style={style}></div>*/}
      </div>
    </figure>
  );
};
