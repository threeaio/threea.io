import { Title } from "@solidjs/meta";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { ContentType } from "~/content/content-type";
import SubNavigation from "~/components/Sub-Navigation";
import { ParentProps } from "solid-js";
import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";

export default function MainArticle(
  props: ParentProps & {
    content: ContentType;
  },
) {
  return (
    <main>
      <Title>Threea - {props.content.titleSeo}</Title>
      <BleedRight
        Right={
          <div class="relative w-full h-full">
            <div class="absolute inset-0">{props.children}</div>
            <div class="flex justify-end sm:sticky sm:top-0 relative">
              <SubNavigation />
            </div>
          </div>
        }
        Left={
          <div class="sm:py-4 md:py-8 lg:py-12">
            <HugeText>
              <div class="flex items-center">
                <h1 class="text-pretty">{props.content.headline}</h1>
              </div>
            </HugeText>
            <SmallText>
              <p class="text-3a-green !mb-6">{props.content.teaser}</p>
              <div class="">{props.content.text}</div>
              <div class="hidden sm:border-dashed pt-4">
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
