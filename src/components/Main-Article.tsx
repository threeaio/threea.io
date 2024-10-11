import { Title } from "@solidjs/meta";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { BasicTextContent } from "~/content/content-type";
import { ParentProps } from "solid-js";
import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";

export default function MainArticle(
  props: ParentProps & {
    content: BasicTextContent;
  },
) {
  return (
    <main>
      <Title>Threea - {/*@once*/ props.content.titleSeo}</Title>
      <BleedRight
        Right={
          <div class="relative w-full h-full">
            <div class="absolute inset-0">{props.children}</div>
          </div>
        }
        Left={
          <div class="sm:py-4 md:py-8 lg:py-12">
            <HugeText>
              <div class="flex items-center mb-4">
                <h1 class="text-pretty">{props.content.headline}</h1>
              </div>
            </HugeText>
            <SmallText>
              <p class="!text-3a-paper">
                {" "}
                <em>{props.content.teaser}</em>
              </p>
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
