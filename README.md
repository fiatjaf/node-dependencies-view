# node-dependencies-view

This repository dependency structure:

![](https://ndv.glitch.me/fiatjaf/node-dependencies-view.svg)

If you want to use one in your repo's `README.md` or anywhere else, use a link like these:

  * https://ndv.glitch.me/webtorrent/webtorrent
  * https://ndv.glitch.me/cyclejs/cyclejs.svg?ratio=3
  * https://ndv.glitch.me/fiatjaf/module-linker
  * https://ndv.glitch.me/fiatjaf/pf?ratio=0.5&rankdir=TB

The query string arguments are set in the **dot** string as properties of the graph. You can use most of them. Documentation is at http://www.graphviz.org/Documentation/dotguide.pdf.

Please don't abuse this service. Since the server is a free [Glitch](https://glitch.com/edit/#!/ndv?path=server.js:33:24) instance it will fail if under heavy load or if you try to fetch a super huge project (GitHub caches images, so it is mostly safe to use it in `README.md`).

The graphs are made with [Viz.js](http://viz-js.com/).

If you want to browse dependencies (for a lot of languages) better, you should try the [Module Linker](https://fiatjaf.alhur.es/module-linker/) browser extension.

If you want more unrelated sugar in your GitHub `README.md`, you should try https://github.com/tj/gh-polls or https://ght.trackingco.de/.
