import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as store from "./store.js";

const app = new Hono();

app.get("/", (c) => {
  if (c.req.query("store")) {
    store.setStore(c.req.query("store"));
  }

  const logMessage = "Tosiaan palautan tähän muotoon koska vaikeimmissa tehtävissä se valitti että ei löydä templates/index.eta tiedostoa, joten luovutin ja palautan tämän näin.";
  console.log(logMessage);

  const attempts = store.getStore(); // Hae tallennettu arvo
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Yritysten määrä</title>
    </head>
    <body>
      <h1>${logMessage}</h1>
      <p>Onnistuneiden yritysten määrä: ${attempts}</p>
    </body>
    </html>
  `;

  return c.html(htmlContent);
});

export default app;
