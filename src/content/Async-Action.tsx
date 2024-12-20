import { BasicTextContent } from "~/content/content-type";
import Anf from "~/components/typo/Anf";

export const AsyncAction: BasicTextContent = {
  titleSeo: "Asynchrone Aktion - Reaktivität und Simplizität",
  moreLink: {
    linkProps: { type: "link", href: "/async-action" },
    title: "Asynchrone Aktion",
  },
  headline: () => <>Asynchrone Aktion</>,
  teaser: () => (
    <>
      <p>
        Mit über 15 Jahren Erfahrung in der{" "}
        <abbr title="User Interface">UI</abbr>
        -Entwicklung und 8 Jahren Arbeit mit{" "}
        <abbr title="Single Page Application">SPA</abbr>-Frameworks, angewendet
        in größeren Produktentwicklungen im Tourismus-, Smarthome- und
        Ticketing-Sektor, habe ich das nötige Feingefühl für die{" "}
        <Anf>vernünftige Lösung</Anf>.
      </p>
      <p>
        Der Fokus liegt hier auf reaktiven Ansätzen, Modularität und{" "}
        <abbr title="Keep it Simple">KISS</abbr>.
      </p>
    </>
  ),
  text: () => (
    <>
      <p>
        Seit dem Start von Angular 2 2017 setze ich auf „funktionale“, einfache
        Programmieransätze wie Redux bzw. Ngrx.
      </p>
      <p>
        Jetzt ist es u.a. Zeit für Signals (deshalb u.a. SolidJs für diese
        Seite). Clevere TypeScript-Lösungen weiß ich von Tag zu Tag mehr zu
        schätzen.
      </p>
      <p>
        Derzeit bin ich in einem Mono-Repo (Modulith) mit NX unterwegs an der
        Stelle aber für alles offen.
      </p>
    </>
  ),
};
