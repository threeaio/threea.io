import { GridIndicator } from "~/components/Grid-Indicator";
import { MainLogo } from "~/components/Logo";
import { SmallText } from "~/components/SmallText";
import { FullWidth } from "~/components/layouts/Full-Width";

export const Footer = () => {
  return (
    <footer id="footer">
      <div class="min-h-32 px-6 md:px-0 sm:bg-3a-gray-darkest">
        <GridIndicator />
        <FullWidth>
          <div class="grid sm:grid-cols-2 xl:grid-cols-3 w-full">
            <div class="py-4 px-4 md:p-8 flex h-full flex-col justify-center xl:col-span-2">
              <div>
                <a href="/" title="to Homepage">
                  <MainLogo size={"small"} />
                </a>
              </div>
            </div>
            <SmallText>
              <div class="py-4 px-4 md:p-8 text-3a-paper">
                <p class="font-normal  text-3a-white">Imprint</p>
                <p>
                  Nikolaj Sokolowski
                  <br />
                  Am Heidbergbad 30
                  <br />
                  28717 Bremen
                </p>
              </div>
            </SmallText>
          </div>
        </FullWidth>
      </div>
    </footer>
  );
};
