import { Title } from "@solidjs/meta";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { ContentType } from "~/content/content-type";
import { fromLandingPageState } from "~/landing-page-state";
import SubNavigation from "~/components/Sub-Navigation";

export default function MainArticle(props: { content: ContentType }) {
  const [{ landingPageState }] = fromLandingPageState;
  return (
    <main>
      <Title>Threea - {props.content.titleSeo}</Title>
      <BleedRightHalf
        Right={
          <div class="grid justify-items-end">
            <SubNavigation />
          </div>
        }
        Left={
          <div class="sm:py-4 md:py-8 lg:py-12">
            <HugeText>
              <div class="flex items-center mt-6">
                <h1 class="text-pretty">{props.content.headline}</h1>
              </div>
            </HugeText>
            <SmallText>
              <p class="text-3a-green !mb-6">{props.content.teaser}</p>
              <div class="">{props.content.text}</div>
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
  );
}
