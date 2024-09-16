import { A } from "@solidjs/router";
import Counter from "~/components/Counter";
import { GridIndicator } from "~/components/Grid-Indicator";
import { Introduction } from "~/routes/(index)/Introduction";
import { Divider } from "~/components/Divider";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/HugeText";
import { Headline } from "~/components/Headline";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { BleedLeftHalf } from "~/components/layouts/bleed-left/Bleed-Left-Half";
import { Title } from "@solidjs/meta";

export default function AntiAgony() {
  return (
    <LandingPageLayout>
      <Title>Threea.io - About me as a Developer</Title>
      <GridIndicator />
      <main>
        <BleedLeftHalf
          Left={
            <img
              alt="Nikolaj Sokolowksi photographing himself"
              class="object-cover h-full w-full object-top"
              src="/ich.webp"
            />
          }
          Right={
            <div class="sm:p-4 md:p-8 lg:p-12">
              <HugeText>
                <div class="flex items-center mt-6">
                  <h1 class="text-pretty">Async Action</h1>
                </div>
              </HugeText>
              <SmallText>
                <p class="text-3a-green !mb-6">
                  As a developer, I deliver simple functional UI-solutions,
                  focused on maintainability, stability and user-friendliness
                </p>
                <div class="">
                  <p>
                    With over 15 years in web/UI and 8+ years in TypeScript,
                    I've tackled projects in tourism, smart-home, and ticketing.
                  </p>
                  <p>
                    My journey into functional programming took off with Angular
                    2 in 2017, leveraging RxJS and NgRx for robust, reactive
                    implementations.
                  </p>
                  <p>
                    Now, I’m delving into Signals, the latest in reactive tech.
                    Beside that I appreciate clever TypeScript solutions more
                    and more.
                  </p>
                  <p>
                    Currently, I use NX in a Mono-Repo setup, but I’m always
                    open to exploring new challenges.
                  </p>
                </div>
              </SmallText>
            </div>
          }
        />
      </main>
      <Divider />
    </LandingPageLayout>
  );
}
