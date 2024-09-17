import { GridIndicator } from "~/components/Grid-Indicator";
import { MainLogo } from "~/components/Logo";
import { SmallText } from "~/components/SmallText";
import { FullWidth } from "~/components/layouts/Full-Width";

export const HeaderSimple = () => {
  return (
    <header id="header">
      <div class="min-h-32">
        <GridIndicator />
        <FullWidth>
          <div class="grid sm:grid-cols-2 xl:grid-cols-3 w-full">
            <div class="py-4 px-4 md:p-8 flex h-full flex-col justify-center xl:col-span-2">
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
