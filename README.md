## Caveats

- On GitHub Pages, only works properly if you're publishing to `https://<USERNAME>.github.io/` or to a custom domain. See [here](https://docs.github.com/en/pages/quickstart) for more information on how to do so. You need to set up a [GitHub Action](https://docs.github.com/en/actions) if you want it to work properly with `https://<USERNAME>.github.io/<REPO>/`. This is mostly due to possible 404 errors resulting from the `<REPO>` segment in the `https://<USERNAME>.github.io/<REPO>/` url.
- You should configure whatever server or service you deploy on to serve [404.html](404.html) when requested page is not found if you desire such functionality (already supported on GitHub pages).
