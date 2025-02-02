## Caveats

- On GitHub Pages, it only works properly if you're publishing to `https://<USERNAME>.github.io/` or to a custom domain. See [here](https://docs.github.com/en/pages/quickstart) for more information on how to do so. You need to set up a [GitHub Action](https://docs.github.com/en/actions) if you want it to work properly with `https://<USERNAME>.github.io/<REPO>/`. See [here](https://vitejs.dev/guide/static-deploy#github-pages) for more help. This is mostly due to possible 404 errors resulting from the `<REPO>` segment in the `https://<USERNAME>.github.io/<REPO>/` url.
- You should configure whatever server or service you deploy on to serve [404.html](404.html) when requested page is not found if you desire such functionality (already supported on GitHub Pages).
- In development, any unknown url that does not point to the pages directory and end in ".html" will return a `404` (page not found). Unknown urls that satisfy those conditions will return [404.html](404.html). In production, the behaviour may vary depending on how the server or service you deploy to is configured (On GitHub Pages, all unknown urls will return [404.html](404.html)).

## Todo

- Add build script.
- Increase customizability.
- Provide configuration options (eg. an option to help deal with `https://<USERNAME>.github.io/<REPO>/` issue).
- Refine and restructure project.
- Style tags properly. Carefully exclude some tags from styles as well.
- Provide easy way of customization (ie. title, nav links, etc...).
- Refine redirection algorithm for development.
- Add support for [Open Graph Meta Tags](https://ahrefs.com/blog/open-graph-meta-tags/).
- Reload when [dev.js](dev.js) changes (maybe).
- Address responsiveness to the smallest of screen sizes (have a look at how [astro-cactus-theme](https://astro-theme-cactus.netlify.app/) handles this).
- Add support for JS/TS in markdown for powering dynamic and interactive experiences.

## Make it your own

- Edit page title in [base.html](base.html).
- Change [me.png](/assets/photos/me.png) (please maintain `me.png` as the name of the photo).
- Change [favicon.svg](/assets/icons/favicon.svg) (please maintain `favicon.svg` as the name of the icons).
- Change the nav title in the `navSection` component in [app.js](app.js).
- Remove [CNAME](CNAME).
- Replace [content](content) with your own content (please follow the existing directory structure).
