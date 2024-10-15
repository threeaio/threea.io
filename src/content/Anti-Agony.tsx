import { BasicTextContent } from "~/content/content-type";

export const AntiAgony: BasicTextContent = {
  titleSeo: "Anti-Agonie - Über Motivation und Prinzipien",
  moreLink: {
    linkProps: { type: "link", href: "/anti-agony" },
    title: "Anti-Agonie",
  },
  headline: () => <>Anti-Agonie</>,
  teaser: () => (
    <>
      <p>
        Ich verfolge einen Mensch-Zentrierten Ansatz in meiner Arbeit. Das
        bedeutet unter anderem, dass ich versuche Produktionsbedingungen und
        Umwelt-Impact mitzudenken.
      </p>
      <p>
        Vor allem aber steht es für den Anspruch, dass eine bessere Welt auch
        durch gute, sinnvolle Software möglich ist.
      </p>
    </>
  ),
  text: () => (
    <>
      <p>
        Gerade mit dem Fokus auf Anwendungen, die mehrere Stunden täglich von
        Menschen genutzt werden (und auch Umwelt „nutzt“) ist eine
        hochqualitative Gestaltung unumgänglich.
      </p>
      <p>
        Hierbei ist es wichtig, neben der weiteren Optimierung und Vereinfachung
        von Standardabläufen, nicht zu vergessen, dass Software auch Spaß machen
        darf. Im Grunde Spaß machen muss, um menschengerecht zu sein.
      </p>
    </>
  ),
};
