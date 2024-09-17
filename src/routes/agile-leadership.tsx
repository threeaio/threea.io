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
import { HeaderSimple } from "~/content/Header-Simple";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";

export default function AntiAgony() {
  return (
    <LandingPageLayout>
      <Title>Threea.io - About agile Leadership</Title>
      <HeaderSimple />
      <div class="">
        <main>
          <BleedRightHalf
            Right={
              <div>
                {/*<img*/}
                {/*  alt="Nikolaj Sokolowksi photographing himself"*/}
                {/*  class="object-cover h-full w-full object-top opacity-20"*/}
                {/*  src="/ich.webp"*/}
                {/*/>*/}
              </div>
            }
            Left={
              <div class="sm:p-4 md:p-8 lg:p-12">
                <HugeText>
                  <div class="flex items-center mt-6">
                    <h1 class="text-pretty">Agile Leadership</h1>
                  </div>
                </HugeText>
                <SmallText>
                  <p class="text-3a-green !mb-6">
                    I have a special feel for solutions that take into account
                    the skills and needs of the team on the one hand and that
                    are convincing in terms of results and costs on the other
                  </p>
                  <div class="">
                    <p>
                      In my 1.5 years as a Product Owner in ticketing, I
                      directed both technical execution and strategic growth,
                      emphasizing high-value iterations.
                    </p>
                    <p>
                      By understanding user needs, swiftly adapting to changes,
                      and involving the team early, we crafted solutions that
                      were market-focused and efficient to produce.
                    </p>
                    <p>
                      As an Angular coach for a year, I imparted best practices
                      in modern UI development, empowering colleagues to create
                      user-centric, scalable applications.
                    </p>
                  </div>
                  <div class="pt-4">
                    <Button isBack={true} href="/" asA={true}>
                      Back
                    </Button>
                  </div>
                </SmallText>
              </div>
            }
          />
        </main>
      </div>

      <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </LandingPageLayout>
  );
}
