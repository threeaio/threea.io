import { GridIndicator } from "~/components/Grid-Indicator";
import { MainLogo } from "~/components/Logo";
import { SmallText } from "~/components/SmallText";

export const Footer = () => {
  return (
    <footer id="footer">
      <div class="min-h-32 p-6 md:px-0">
        <GridIndicator />
        <div class="w-full h-full grid grid-cols-26">
          <div class="col-span-26 md:col-span-11 md:col-start-3 2xl:col-span-12 2xl:col-start-5 ">
            <div class="md:p-8 flex h-full flex-col justify-center">
              <div>
                <MainLogo size={"small"} />
              </div>
            </div>
          </div>
          <div class="col-span-26 md:col-span-11 2xl:col-span-6  h-full">
            <SmallText>
              <div class="md:p-8 text-3a-paper">
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
        </div>
      </div>
    </footer>
  );
};
