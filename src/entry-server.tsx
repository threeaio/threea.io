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
            @import
            url('https://fonts.googleapis.com/css2?family=Trispace:wght@100..800&display=swap');
          </style>

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.min.js" />
        </body>
      </html>
    )}
  />
));
