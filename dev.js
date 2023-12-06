import chokidar from "chokidar";
import { fileURLToPath } from "url";
import { createServer } from "vite";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import fs from "fs-extra";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const watcher = chokidar.watch(`${__dirname}content`, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

function getNewPath(path) {
  let isMarkdownFile = false;
  let isHome = path.includes("content/home");
  // make sure we don't replace any other path segment named `content` that we don't intend to
  let firstContentKeywordReplaced = false;
  const pathSegments = path.split("/").map((segment) => {
    if (segment === "content" && !firstContentKeywordReplaced) {
      firstContentKeywordReplaced = true;
      return "pages";
    } else {
      return segment;
    }
  });
  const lastPathSegment = pathSegments[pathSegments.length - 1];
  const newLastPathSegment = lastPathSegment
    .split(".")
    .map((segment, i) => {
      if (i === lastPathSegment.split(".").length - 1) {
        if (segment === "md") {
          isMarkdownFile = true;
          return "html";
        } else {
          return segment;
        }
      } else {
        return segment;
      }
    })
    .join(".");
  pathSegments[pathSegments.length - 1] = newLastPathSegment;

  return [pathSegments.join("/"), isMarkdownFile, isHome];
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

function wrapWithBase(parsedContent) {
  return fs
    .readFileSync(__dirname + "base.html", "utf8")
    .replace("__content_marker__", parsedContent);
}

function parseMarkdown(content) {
  return marked.parse(
    content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""),
  );
}

function handleFileOutput(path) {
  const [newPath, isMarkdownFile, isHome] = getNewPath(path);
  if (isMarkdownFile) {
    if (isHome) {
      fs.outputFileSync(
        __dirname + "index.html",
        wrapWithBase(parseMarkdown(fs.readFileSync(path, "utf8"))),
      );
      fs.outputFileSync(
        __dirname + "404.html",
        wrapWithBase(parseMarkdown(fs.readFileSync(path, "utf8"))),
      );
    } else {
      fs.outputFileSync(
        newPath,
        wrapWithBase(parseMarkdown(fs.readFileSync(path, "utf8"))),
      );
    }
  }
}

async function init() {
  watcher
    .on("add", (path) => {
      console.log(`File ${path} has been added`);
      handleFileOutput(path);
    })
    .on("change", (path) => {
      console.log(`File ${path} has been changed`);
      handleFileOutput(path);
    })
    .on("unlink", (path) => {
      console.log(`File ${path} has been removed`);
      const [newPath, isMarkdownFile, isHome] = getNewPath(path);
      if (isMarkdownFile && !isHome) {
        fs.removeSync(newPath);
      }
    })
    .on("addDir", (path) => {
      console.log(`Directory ${path} has been added`);
      const [newPath, _, isHome] = getNewPath(path);
      if (!isHome) {
        fs.ensureDirSync(newPath);
      }
    })
    .on("unlinkDir", (path) => {
      console.log(`Directory ${path} has been removed`);
      const [newPath, _, isHome] = getNewPath(path);
      if (!isHome) {
        fs.removeSync(newPath);
      }
    })
    .on("error", (error) => {
      console.log(`Watcher error: ${error}`);
    })
    .on("ready", () => {
      console.log("Initial scan complete. Ready for changes");
    })
    .on("raw", (event, path, details) => {
      console.log("Raw event info:", event, path, details);
    });

  const server = await createServer({
    configFile: "vite.config.js",
    root: __dirname,
  });
  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
}

init()
  .then(() => console.log("Dev started!"))
  .catch(() => console.log("Dev failed!"));
