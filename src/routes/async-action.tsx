import { Divider } from "~/components/Divider";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
const CanvasAnimation2 = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

export default function AntiAgony() {
  return (
    <LandingPageLayout>
      <Title>Threea.io - About me as a Developer</Title>
      <CanvasAnimationWrapper animation={<CanvasAnimation2 hue={140} />}>
        <HeaderSimple />
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
                      I've tackled projects in tourism, smart-home, and
                      ticketing.
                    </p>
                    <p>
                      My journey into functional programming took off with
                      Angular 2 in 2017, leveraging RxJS and NgRx for robust,
                      reactive implementations.
                    </p>
                    <p>
                      Now, I’m delving into Signals, the latest in reactive
                      tech. Beside that I appreciate clever TypeScript solutions
                      more and more.
                    </p>
                    <p>
                      Currently, I use NX in a Mono-Repo setup, but I’m always
                      open to exploring new challenges.
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
        <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
          <Divider />
        </div>
      </CanvasAnimationWrapper>
    </LandingPageLayout>
  );
}
