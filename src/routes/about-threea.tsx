import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";
import { Title } from "@solidjs/meta";
import { HugeText } from "~/components/typo/HugeText";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";

export default function Home() {
  return (
    <main>
      <Title>Threea - Über dieses Projekt</Title>

      <HeaderSimple class="absolute z-20 w-full" />

      <FullWidth class="">
        <div class="h-svh relative flex flex-col justify-center">
          <div class="mb-4 text-3a-green">Über threea.io</div>
          <HugeText>
            <h1 class="mb-4">
              Mein Raum für kreatives Arbeiten und Einladung zur Kollaboration
            </h1>
          </HugeText>
        </div>
      </FullWidth>

      <BleedRight
        class="h-svh relative"
        Left={
          <div class="h-full flex flex-col justify-end">
            <div class="py-16 pr-16">
              <HugeText>
                <h1 class="mb-4">
                  Mein Raum für kreatives Arbeiten und Einladung zur
                  Kollaboration
                </h1>
              </HugeText>
              {/*<SmallText>*/}
              {/*  <p>*/}
              {/*    Diese Seite ist vor allem ein Playground, um, nach Jahren in*/}
              {/*    der Entwicklung von UI für{" "}*/}
              {/*    <abbr title="Create/Read/Update/Delete">CRUD</abbr>*/}
              {/*    -Anwendungen, mich wieder den gestalterischen Aspekten der*/}
              {/*    Webentwicklung zu widmen.*/}
              {/*  </p>*/}
              {/*  <p>*/}
              {/*    Das heißt, dass ich hier bewusst den guten Grundsatz "Form*/}
              {/*    follows Function" auch mal brechen werde und gestalterische*/}
              {/*    Elemente aus reinem Spaß am Prozess der Herstellung einbringen*/}
              {/*    werde.*/}
              {/*  </p>*/}
              {/*</SmallText>*/}
            </div>
          </div>
        }
        Right={
          <div class="bg-3a-gray-darkest h-full">
            <div class="h-full w-full mix-blend-lighten">
              <img
                id="hero-graphic"
                alt="Nikolaj Sokolowksi photographing himself"
                class="object-cover h-full w-full max-h-[100svh] opacity-100"
                src="/tristesse.jpeg"
              />
            </div>
          </div>
        }
      />
    </main>
  );
}
