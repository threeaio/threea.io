import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "cal-sans";
import "./app.css";
import { MetaProvider } from "@solidjs/meta";

export default function App() {
  return (
    <MetaProvider>
      <Router
        root={(props) => (
          <>
            {/*<Nav />*/}
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
