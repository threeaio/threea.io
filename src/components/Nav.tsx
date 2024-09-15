import { useLocation } from "@solidjs/router";
import { FullWidth } from "~/components/layouts/Full-Width";

export default function Nav() {
  const location = useLocation();

  const active = (path: string) => {
    return path === location.pathname ? "text-3a-green" : "";
  };

  return (
    <FullWidth>
      <nav class="bg-sky-800">
        <ul class="container flex items-center py-3 ">
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
            <a href="/">Home</a>
          </li>
          <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
            <a href="/src/routes/anti-agony">About</a>
          </li>
          <li class={`border-b-2 ${active("/grid")} mx-1.5 sm:mx-6`}>
            <a href="/grid">Grid</a>
          </li>
        </ul>
      </nav>
    </FullWidth>
  );
}
