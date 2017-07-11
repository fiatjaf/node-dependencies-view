# node-dependencies-view

This repository dependency structure:

![](https://ndv.glitch.me/fiatjaf/node-dependencies-view.svg?ratio=0.5)

If you want to usr one in your repo's `README.md` or anywhere else, use a link like this:

```
https://ndv.glitch.me/ipfs/js-ipfs.svg?ratio=0.2
```

`ratio` is adjustable so you can make it more expanded (higher values, try starting at 0.1) or more compressed ("compress" is the option that takes less space). Other Graphviz configuration options may be coming soon.

Please don't abuse this. Since the server is a free [Glitch](https://glitch.com/edit/#!/ndv?path=server.js:33:24) instance it will fail if under heavy load or if you try to fetch a super huge project (GitHub caches images, so it is mostly safe to use it in `README.md`).

The graphs are made with [Viz.js](http://viz-js.com/).

If you want to browse dependencies (for a lot of languages) better, you should try the [Module Linker](https://fiatjaf.alhur.es/module-linker/) browser extension.

If you want more unrelated sugar in your GitHub `README.md`, you should try https://github.com/tj/gh-polls or https://ght.trackingco.de/.
