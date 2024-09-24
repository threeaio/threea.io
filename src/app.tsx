import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "cal-sans";
import "./app.css";
import { MetaProvider } from "@solidjs/meta";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import SubNavigation from "~/components/Sub-Navigation";

export default function App() {
  return (
    <div>
      <MetaProvider>
        <Router
          root={(props) => (
            <div>
              <SubNavigation />
              <LandingPageLayout>
                <Suspense>{props.children}</Suspense>
              </LandingPageLayout>
            </div>
          )}
        >
          <FileRoutes />
        </Router>
      </MetaProvider>
    </div>
  );
}
