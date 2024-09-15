export const MainLogo = (
  props: { size: "normal" | "small" } = { size: "normal" },
) => {
  return (
    <div class="flex items-center gap-8 py-8">
      <div class={props.size === "normal" ? "w-16 h-16" : "w-12 h-12"}>
        <svg viewBox="321.25 213.5 301 301" class="fill-3a-white w-full h-full">
          <polygon points="479.248 305.75 455.248 305.75 416.752 410.75 440.752 410.75 479.248 305.75" />
          <polygon
            class="main-logo"
            points="448.248 305.75 424.248 305.75 385.752 410.75 409.752 410.75 448.248 305.75"
          />
          <polygon
            class="main-logo"
            points="510.248 305.75 486.248 305.75 447.752 410.75 471.752 410.75 510.248 305.75"
          />
          <polygon
            class="main-logo"
            points="555.5 410.75 517.004 305.75 516.5 305.75 504.752 337.793 517.201 371.75 492.371 371.75 485.405 390.75 524.167 390.75 531.5 410.75 555.5 410.75"
          />
          <path
            class="main-logo"
            d="M471.75,213.5c-83.119,0-150.5,67.381-150.5,150.5s67.381,150.5,150.5,150.5,150.5-67.381,150.5-150.5-67.381-150.5-150.5-150.5ZM471.75,493c-71.245,0-129-57.755-129-129s57.755-129,129-129,129,57.755,129,129-57.755,129-129,129Z"
          />
        </svg>
      </div>
      <div class="text-3a-white font-light">threea.io</div>
    </div>
  );
};
