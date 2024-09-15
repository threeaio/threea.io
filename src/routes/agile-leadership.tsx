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
              id="hero-graphic"
              alt="Nikolaj Sokolowksi photographing himself"
              class="object-cover h-full w-full object-top"
              src="/ich.webp"
            />
          }
          Right={
            <div class="p-8 lg:p-12">
              <HugeText>
                <div class="flex items-center mt-6">
                  <h2 class="text-pretty">Agile Leader</h2>
                </div>
              </HugeText>
              <SmallText>
                <p class="text-3a-green !mb-6">
                  I have a special instinct for the solution that fits the skill
                  and needs of the team and convinces in terms of results and
                  costs
                </p>
                <div class="">
                  <p>
                    In my 1.5 years as a Product Owner in ticketing, I directed
                    both technical execution and strategic growth, emphasizing
                    high-value iterations.
                  </p>
                  <p>
                    By understanding user needs, swiftly adapting to changes,
                    and involving the team early, we crafted solutions that were
                    market-focused and efficient to produce.
                  </p>
                  <p>
                    As an Angular coach for a year, I imparted best practices in
                    modern UI development, empowering colleagues to create
                    user-centric, scalable applications.
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
