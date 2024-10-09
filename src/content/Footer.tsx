import { GridIndicator } from "~/components/Grid-Indicator";
import { MainLogo } from "~/components/Logo";
import { SmallText } from "~/components/SmallText";
import { FullWidth } from "~/components/layouts/Full-Width";

export const Footer = () => {
  return (
    <footer id="footer">
      <div class="min-h-32 sm:px-6 md:px-0 sm:bg-3a-gray-darkest">
        <GridIndicator />
        <FullWidth>
          <div class="grid sm:grid-cols-2 xl:grid-cols-3 w-full">
            <div class="sm:p-4 md:p-8 flex h-full flex-col justify-center xl:col-span-2">
              <div>
                <a href="/" title="to Homepage">
                  <MainLogo size={"small"} />
                </a>
              </div>
            </div>

            <SmallText>
              <div class="sm:p-4 md:p-8 text-3a-paper font-mono text-sm">
                <p class="font-normal  text-3a-white">Impressum</p>
                <p>
                  Nikolaj Sokolowski
                  <br />
                  Am Heidbergbad 30
                  <br />
                  28717 Bremen
                </p>
                <p>
                  <a href={"mailto:nikolaj@threea.io"}>nikolaj@threea.io</a>
                </p>
                {/*<div class="">*/}
                {/*  <svg class="w-6 h-6" viewBox="0 0 24 24">*/}
                {/*    <path*/}
                {/*      class="fill-3a-white"*/}
                {/*      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"*/}
                {/*    ></path>*/}
                {/*  </svg>*/}
                {/*</div>*/}
              </div>
            </SmallText>
          </div>
        </FullWidth>
      </div>
    </footer>
  );
};
