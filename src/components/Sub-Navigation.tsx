import { Button } from "~/components/Button";
import { fromLandingPageState } from "~/landing-page-state";

export default function SubNavigation() {
  const [{ landingPageState }] = fromLandingPageState;
  return (
    <ul
      class="fixed top-12 w-full sm:w-auto flex p-12 flex-col gap-4 transition-all bg-3a-gray-darkest translate-y-[var(--menu-y)]"
      classList={
        {
          // "opacity-20": Math.abs(landingPageState.velocity) > 0.1,
        }
      }
      style={{ "--menu-y": `${landingPageState.velocity * -40}px` }}
    >
      <li>
        <Button href="/async-action" asA={true}>
          More on Coding
        </Button>
      </li>
      <li>
        <Button href="/anti-agony" asA={true}>
          More on my Motivation
        </Button>
      </li>
      <li>
        <Button href="/agile-leadership" asA={true}>
          More on Agit
        </Button>
      </li>
    </ul>
  );
}
