# Expression Atlas Anatomogram

[![Build Status](https://travis-ci.org/gxa/atlas-anatomogram.svg?branch=master)](https://travis-ci.org/gxa/atlas-anatomogram) [![Coverage Status](https://coveralls.io/repos/github/gxa/atlas-anatomogram/badge.svg?branch=master)](https://coveralls.io/github/gxa/atlas-anatomogram?branch=master) [![Dependency Status](https://gemnasium.com/badges/github.com/gxa/atlas-anatomogram.svg)](https://gemnasium.com/github.com/gxa/atlas-anatomogram) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

This is an anatomogram for [Expression Atlas](http://www.ebi.ac.uk/gxa) that we use to illustrate the experiments.

[See demo here](https://gxa.github.io/anatomogram-demo/index.html).

The ontology IDs are sourced from [Uberon](www.uberon.org), [EFO](www.ebi.ac.uk/efo) and [Plant Ontology](www.plantontology.org/).

To install:
`npm install --save anatomogram`

You can use it as a React component:
```
import Anatomogram from 'anatomogram'

...

<Anatomogram .../>
 
```

Alternatively, if you don’t use React we’re providing a convenience `render` method:
```
import {render} from 'anatomogram'

...

render(options, target)
```

Where `options` are the props passed as an object, and `target` is an ID of the DOM element that will contain the 
anatomogram.

For example code, have a look at [the demo 
component](https://github.com/gxa/anatomogram/blob/master/html/AnatomogramDemo.js) and how we use it in 
https://github.com/gxa/atlas-heatmap. If you want to see it in action, go to [an organism part experiment in 
Atlas](https://www.ebi.ac.uk/gxa/experiments/E-MTAB-513) or [a search that returns organism part 
experiments](https://www.ebi.ac.uk/gxa/search?geneQuery=[{%22value%22:%22zinc%20finger%22}]).

## Props

| Name              | Type     | Default value    | Description                                                          |
|-------------------|----------|:----------------:|----------------------------------------------------------------------|
| species           | string   |       -          |                                                                      |
| showIds           | array    |       -          |                                                                      |
| highlightIds      | array    |       -          |                                                                      |
| selectIds         | array    |       -          |                                                                      |
| showColour        | string   | grey             |                                                                      |
| highlightColour   | string   | red              |                                                                      |
| selectColour      | string   | purple           |                                                                      |
| showOpacity       | number   | 0.4              |                                                                      |
| highlightOpacity  | number   | 0.4              |                                                                      |
| selectOpacity     | number   | 0.4              |                                                                      |
| onMouseOver       | function |   `() => {}`     | Callback invoked when the mouse is hovered on a tissue               |
| onMouseOut        | function |   `() => {}`     | Callback invoked when the mouse is hovered off a tissue              |
| onClick           | function |   `() => {}`     | Callback invoked when a tissue is clicked                            |

For a list of available species and IDs have a look at 
[`src/json/svgsMetadata.json`](https://github.com/gxa/anatomogram/blob/master/src/json/svgsMetadata.json). The file is 
automatically generated every time the package is published.

All three callbacks take a single string argument, the ID of the tissue affected by the mouse event.

## Building
```
npm run dist -- --output-public-path <URL>

```

`<URL>` is the URL (absolute or relative) from which you’ll be serving the anatomogram. This is required so that the 
code knows where to look for static assets (i.e. SVGs and PNGs). You can read more about this option in [Webpack’s 
documentation site](https://webpack.js.org/configuration/output/#output-publicpath).

## Contribute

Read carefully [the authoring guidelines](https://github.com/gxa/anatomogram/tree/master/src/svg) before adding new 
tissues or IDs to an existing anatomogram or adding a new SVG.
 
Run `npm run parseSvgs` to parse the updated IDs. When you are finished run a local copy of the demo page:
```
webpack-dev-server -d
```

Go to `localhost:9000/html` and see that the tissues show up like you want them to.
