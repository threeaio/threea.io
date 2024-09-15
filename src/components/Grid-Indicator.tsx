export const GridIndicator = () => {
  return (
    <div class="w-full h-0 relative hidden sm:block">
      <div class="grid h-4 w-full  absolute grid-cols-26 z-20">
        <div class="relative h-full sm:col-span-11 sm:col-start-3 xl:col-span-6 xl:col-start-5 ">
          <div class="absolute left-0 h-full  w-px bg-3a-white"></div>
          <div class="absolute right-0 h-full w-px bg-3a-white"></div>
        </div>
        <div class="relative h-full sm:col-span-11 xl:col-span-6">
          <div class="absolute right-0 h-full w-px bg-3a-white"></div>
        </div>
        <div class="relative h-full sm:hidden 2xl:block xl:col-span-6">
          <div class="absolute right-0 h-full w-px bg-3a-white"></div>
        </div>
      </div>
    </div>
  );
};
