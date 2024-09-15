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

export default function AntiAgony() {
  return (
    <LandingPageLayout>
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
                  <h2 class="text-pretty">Anti-Agony</h2>
                </div>
              </HugeText>
              <SmallText>
                <p class="text-3a-green !mb-6">
                  Improving daily interactions and creating tools for the people
                  through thoughtful, human-centred software is what drives me
                </p>
                <div class="">
                  <p>
                    I adopt a human-centered approach, mindful also of
                    production, distribution, and environmental impact.
                    High-quality design is crucial, especially for applications
                    used daily for hours.
                  </p>
                  <p>
                    It’s about simplifying processes while making software
                    enjoyable and engaging. My goal is to create software that
                    serves people by being efficient, enjoyable, and
                    human-friendly.
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
