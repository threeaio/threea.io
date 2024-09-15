import { GridIndicator } from "~/components/Grid-Indicator";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { Divider } from "~/components/Divider";
import { Introduction } from "~/routes/(index)/Introduction";
import { FullWidth } from "~/components/layouts/Full-Width";
import { Headline } from "~/components/Headline";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";

export default function Home() {
  return (
    <LandingPageLayout>
      <GridIndicator />
      <main>
        <Introduction />
        <Divider />
        <FullWidth>
          <HugeText>
            <div class="flex items-center py-12 md:py-16 xl:py-20">
              <h2 class="text-pretty">
                From Concept to Experience:{" "}
                <span class="text-3a-green">A Holistic Approach</span>
              </h2>
            </div>
          </HugeText>
        </FullWidth>
        <FullWidth>
          <div class="grid grid-cols-3 w-full">
            {/*Conduct*/}
            <div class="col-span-3 md:col-span-1 py-12">
              <Headline>Anti-Agony</Headline>
              <SmallText>
                <p class="text-3a-green !mb-12">
                  Improving daily interactions through thoughtful, human-centred
                  software design is what drives me
                </p>
                <div class="hidden">
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
                <Button href="/about" asA={true}>
                  More <span class="hidden lg:inline">on my Motivation</span>
                </Button>
              </SmallText>
            </div>
            {/*Code*/}
            <div class="col-span-3 md:col-span-1 py-12">
              <Headline>Async Action</Headline>
              <SmallText>
                <p class="text-3a-green !mb-12">
                  As a developer, I deliver simple functional solutions, focused
                  on maintainability and user-friendliness
                </p>
                <div class="hidden">
                  <p>
                    With over 15 years in web/UI and 8+ years in TypeScript,
                    I've tackled projects in tourism, smart home, and ticketing.
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
                <Button href="/about" asA={true}>
                  More <span class="hidden lg:inline">on Coding</span>
                </Button>
              </SmallText>
            </div>
            {/*Lead*/}
            <div class="col-span-3 md:col-span-1 py-12">
              <Headline>Agile Leadership</Headline>
              <SmallText>
                <p class="text-3a-green !mb-12">
                  As a product owner, I have a special instinct for the solution
                  that convinces both in terms of results and costs
                </p>
                <div class="hidden">
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
                <Button href="/about" asA={true}>
                  <span>
                    More <span class="hidden lg:inline">on Processes</span>
                  </span>
                </Button>
              </SmallText>
            </div>
          </div>
        </FullWidth>
      </main>
      <Divider />
    </LandingPageLayout>
  );
}
