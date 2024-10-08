import { GridIndicator } from "~/components/Grid-Indicator";
import { MainLogo } from "~/components/Logo";
import { FullWidth } from "~/components/layouts/Full-Width";
import { JSX } from "solid-js";

export const HeaderSimple = (props: JSX.HTMLAttributes<HTMLElement>) => {
  return (
    <header id="header" {...props}>
      <div class="min-h-32 mb-24 sm:mb-0">
        <GridIndicator />
        <FullWidth>
          <div class="grid sm:grid-cols-2 xl:grid-cols-3 w-full">
            <div class="flex h-full flex-col justify-center xl:col-span-2">
              <div>
                <a href="/" title="to Homepage">
                  <MainLogo size={"normal"} />
                </a>
              </div>
            </div>
          </div>
        </FullWidth>
      </div>
    </header>
  );
};
