import { BasicTextContent } from "~/content/content-type";

export const AgileAgit: BasicTextContent = {
  titleSeo:
    "Agile Agitation - Über meine Rollen im und Gedanken zum agilen Umfeld",
  moreLink: {
    href: "/agile-agit",
    title: "Agile Agit",
  },
  headline: () => <>Agile Agit</>,
  teaser: () => (
    <>
      <p>
        Als Product Owner und Frontend-Lead in den Bereichen Ticketing und
        Smarthome habe ich nicht nur technisches Know-How eingebracht, sondern
        Produktentwicklungen auch fachlich stark begleitet.
      </p>
      <p>
        Neben der Tätigkeit als <abbr title="Product Owner">PO</abbr> war ich
        als Coach und Trainer in der internen Weiterbildung tätig.
      </p>
    </>
  ),
  text: () => (
    <>
      <p>
        Diese Rollen ermöglichten es mir, den Entwicklungsprozess von der Idee
        bis zur fertigen Lösung zu beeinflussen und mit einem agilen Team
        nutzerzentrierte und effiziente Lösungen zu entwickeln.
      </p>
      <p>
        Für ca. ein Jahr war ich außerdem als Angular-Coach tätig, wo ich Ein-
        und Umsteiger in Best Practices und modernen Ansätzen in der
        UI-Entwicklung mit Typescript v.a. In Angular, RxJs und NgRx geschult
        habe.
      </p>
    </>
  ),
};
