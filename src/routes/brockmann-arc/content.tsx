import Anf from "~/components/typo/Anf";
import { Accessor, JSX } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { AnimationTrigger } from "~/_util";

export interface AnimatedSubSection {
  num: string;
  title: string;
  description: () => JSX.Element;
  animation: (trigger?: Accessor<AnimationTrigger>) => JSX.Element;
}

const ANIMATION_01_IDEA = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-1"),
);
const ANIMATION_02 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-2"),
);
const ANIMATION_03 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-3"),
);

const ANIMATION_00_INTRO = clientOnly(
  () => import("~/routes/brockmann-arc/animation-intro"),
);

export const intro = {
  headline: () => (
    <>
      Brockmanns
      <br /> Beethoven
    </>
  ),
  animation: () => <ANIMATION_00_INTRO bgColor={"GRAY_DARKEST"} />,
  text: () => (
    <>
      <p>
        Ziel hier ist es, ein paar Grundlagen in der Generierung von Grafik (mit
        Canvas bzw. P5.js) zu verinnerlichen und nebenbei etwas{" "}
        <Anf>Schönes</Anf> zu erstellen
      </p>
      <p>Das Projekt wird fortlaufend aktualisiert.</p>
    </>
  ),
};

export const inspiration = {
  title: "Inspiration",
  num: "01",
  text: () => (
    <>
      <p>
        Inspiriert ist dieser erste Wurf durch{" "}
        <a
          href="https://de.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann"
          title={"Zum Wikipedia-Eintrag von Josef Müller-Brockmann"}
          target={"_blank"}
        >
          Josef Müller-Brockmanns
        </a>{" "}
        Beethoven-Plakat von 1955.
      </p>
      <p>
        Müller-Brockmann wird hier wohl noch häufiger herhalten müssen,
        einerseites als Grundlage für grafische Arbeiten, aber auch als
        Stichwortgeber für theoretische Gedanken.
      </p>
      <p>
        Der humanistische Anspruch spiegelt sich in seinen Arbeiten ebenso
        wieder, wie die Erkenntnis, dass Ästhetik auch mathematischen
        Gesetzmäßigkeiten folgt.
      </p>
    </>
  ),
};

export const step1: AnimatedSubSection = {
  title: "Idee zur Animation",
  num: "02",
  animation: () => <ANIMATION_01_IDEA />,
  description: () => (
    <>
      <p>
        Nach einigem Probieren und Aufrischen meines 9.
        Klasse-Trigonometrie-Wissens habe ich entschieden, dass die Bögen als
        Rechtecke an einer Position außerhalb der Grafik starten und sich dann,
        in einer fließenden Bewegung, an ihre Zielposition im <Anf>Kreis</Anf>{" "}
        bewegen sollten.
      </p>
      <p>
        Grundlage der Umsetzung ist dann, dass ich von der Länge der Bögen an
        der Zielposition als <Anf>Strecke</Anf> ausgehe und anhand einer fixen
        Auflösung Punkte auf dieser zeichne. Diese <Anf>Strecke</Anf> wird dann
        Anhand eines Animationsparameters verschoben.
      </p>
      <p>
        Je nachdem, ob einer dieser Punkte an dem Mittelpunkt des Kreises vorbei
        ist oder nicht, werden die Koordination dieses Punktes entweder an ihrer
        Position belassen oder auf den Kreis <Anf>projiziert</Anf>.
      </p>
    </>
  ),
};

export const step2: AnimatedSubSection = {
  title: "Weitere Parameter",
  num: "03",
  animation: (trigger) => (
    <ANIMATION_02 animateCommand={trigger && trigger()} />
  ),
  description: () => (
    <>
      <p>
        Auch ohne selbst Lineal und Zirkel anzulegen, lassen sich schnell ein
        paar Parameter zur Geometrie des Plakats finden.
      </p>
      <p>
        So liegen Start und Ende der Bögen selbst auf einem Raster, welches den
        Kreis in 32 Segmente unterteilt &ndash; also 11.25&deg;. Die{" "}
        <Anf>Dicke</Anf> der Bögen verdoppelt sich nach außen hin mit jedem
        Bogen.
      </p>
      <p>
        Ich habe mich hier entschieden eine leichte Zufälligkeit in den Start-
        und End-Winkel einzubauen, um das Ganze ein wenig interessanter zu
        gestalten.
      </p>
      <p>
        Da die Bögen auch links vom Mittelpunktes des Kreises aus{" "}
        <Anf>starten</Anf> können, wurde eine Extra-Drehung eingbaut, um dieses
        einfach abzubilden.
      </p>
    </>
  ),
};

export const step3: AnimatedSubSection = {
  title: "Zwischenergebnis",
  num: "04",
  animation: (trigger) => (
    <ANIMATION_03 animateCommand={trigger && trigger()} />
  ),
  description: () => (
    <>
      <p>
        Hier ist ein weiterer Zufallsparameter eingabaut, der die Startposition
        der Bögen verschiebt. Außerdem wurde ein wenig Abstand zwischen die
        Bögen eingefügt.
      </p>
      {/*<p>*/}
      {/*  Durch Drücken der <Kbd>A</Kbd>-Taste kannst du sowohl Startposition,*/}
      {/*  als auch die Zielwinkel auf neue Werte animieren*/}
      {/*</p>*/}
      {/*<h3>Zwischenfazit</h3>*/}
      <p>
        Es gäbe noch einige weitere Ideen. Trotzdem lege ich hier erstmal eine
        Pause ein und schaue, was sich mit ein paar Parametern aus diesem Teil
        generieren lässt.
      </p>
      {/*<p>*/}
      {/*  Neben den fehlenden Segmenten, wirkt das <Anf>Einfahren</Anf> von*/}
      {/*  links und die damit verbundene <Anf>Extra-Umdrehung</Anf> noch nicht*/}
      {/*  so, wie ich es mir ausgemalt hatte.*/}
      {/*</p>*/}
      {/*<p>*/}
      {/*  Trotzdem lege ich hier erstmal eine Pause ein und schaue, was sich mit*/}
      {/*  ein paar Parametern aus diesem Teil generieren lässt.*/}
      {/*</p>*/}
    </>
  ),
};

export const gallery = {
  title: "Galerie",
  num: "05",
};
