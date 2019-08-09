const express = require("express");
const consola = require("consola");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const { Nuxt, Builder } = require("nuxt");
const app = express();
const app = express();
app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use("/admin", adminData.routes);
  app.use(shopRoutes);
  app.use((req, res, next) => {
    res.status(404).render("404");
  });
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
