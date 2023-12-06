import fs from "fs";
import path from "path";

const serve404 = () => ({
  name: "configure-server",
  configureServer(server) {
    server.middlewares.use((req, _, next) => {
      if (
        !fs.existsSync(__dirname + req.url) &&
        path.extname(req.url) === ".html" &&
        req.url.includes("pages")
      ) {
        req.url = "/404.html";
      }
      next();
    });
  },
});

export default {
  appType: "mpa",
  server: {
    open: true,
  },
  plugins: [serve404()],
};
