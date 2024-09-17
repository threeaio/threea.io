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
import { BleedLeftSmall } from "~/components/layouts/bleed-left/Bleed-Left-Small";
import { HeaderSimple } from "~/content/Header-Simple";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";

export default function AntiAgony() {
  return (
    <LandingPageLayout>
      <Title>Threea.io - About my Motivation</Title>
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
                    <h1 class="text-pretty">Anti-Agony</h1>
                  </div>
                </HugeText>
                <SmallText>
                  <p class="text-3a-green !mb-6">
                    Improving daily interactions and creating tools for the
                    people through thoughtful, human-centred software is what
                    drives me
                  </p>
                  <div class="">
                    <p>
                      I adopt a human-centered approach, mindful also of
                      production, distribution, and environmental impact.
                      High-quality design is crucial, especially for
                      applications used daily for hours.
                    </p>
                    <p>
                      It’s about simplifying processes while making software
                      enjoyable and engaging. My goal is to create software that
                      serves people by being efficient, enjoyable, and
                      human-friendly.
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
