// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <style>
            @Import
            "https://fonts.googleapis.com/css2?family=Trispace:wght@100..800&display=swap"
            @import "cal-sans";
          </style>

          {/*<link*/}
          {/*  rel="preload"*/}
          {/*  href="https://fonts.googleapis.com/css2?family=Trispace:wght@100..800&display=swap"*/}
          {/*  as="style"*/}
          {/*  onload="this.onload=null;this.rel='stylesheet'"*/}
          {/*/>*/}

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
