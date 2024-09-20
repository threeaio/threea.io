import { Title } from "@solidjs/meta";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { ContentType } from "~/content/content-type";

export default function MainArticle(props: { content: ContentType }) {
  return (
    <main>
      <Title>Threea.io - {props.content.titleSeo}</Title>
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
