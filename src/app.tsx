import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { MetaProvider } from "@solidjs/meta";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import SubNavigation from "~/components/Sub-Navigation";
import { NavigationProvider } from "~/Navigation-Context";

export default function App() {
  return (
    <div>
      <MetaProvider>
        <Router
          root={(props) => (
            <NavigationProvider>
              <SubNavigation />
              <div id={"PAGE_3a"} class={"opacity-0"}>
                <LandingPageLayout>
                  <Suspense>{props.children}</Suspense>
                </LandingPageLayout>
              </div>
            </NavigationProvider>
          )}
        >
          <FileRoutes />
        </Router>
      </MetaProvider>
    </div>
  );
}
