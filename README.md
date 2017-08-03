# Expression Atlas Anatomogram

[![Build Status](https://travis-ci.org/gxa/anatomogram.svg?branch=master)](https://travis-ci.org/gxa/anatomogram) [![Coverage Status](https://coveralls.io/repos/github/gxa/anatomogram/badge.svg?branch=master)](https://coveralls.io/github/gxa/anatomogram?branch=master) [![Dependency Status](https://gemnasium.com/badges/github.com/gxa/anatomogram.svg)](https://gemnasium.com/github.com/gxa/anatomogram) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

This is an anatomogram for [Expression Atlas](https://www.ebi.ac.uk/gxa) that we use to illustrate the experiments.

[See demo here](https://gxa.github.io/anatomogram-demo/index.html).

The ontology IDs are sourced from [Uberon](www.uberon.org), [EFO](www.ebi.ac.uk/efo) and [Plant 
Ontology](www.plantontology.org/).

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

| Name             | Type     | Default value  | Description                                                          |
|------------------|----------|:--------------:|----------------------------------------------------------------------|
| species          | string   |       -        | This is the only required attribute of the anatomogram               |
| showIds          | array    |       []       |                                                                      |
| highlightIds     | array    |       []       |                                                                      |
| selectIds        | array    |       []       |                                                                      |
| showColour       | string   | grey           |                                                                      |
| highlightColour  | string   | red            |                                                                      |
| selectColour     | string   | purple         |                                                                      |
| showOpacity      | number   | 0.4            |                                                                      |
| highlightOpacity | number   | 0.4            |                                                                      |
| selectOpacity    | number   | 0.4            |                                                                      |
| onMouseOver      | function |   `() => {}`   | Callback invoked when the mouse is hovered on a tissue               |
| onMouseOut       | function |   `() => {}`   | Callback invoked when the mouse is hovered off a tissue              |
| onClick          | function |   `() => {}`   | Callback invoked when a tissue is clicked                            |

For a list of available species and IDs have a look at 
[`src/json/svgsMetadata.json`](https://github.com/gxa/anatomogram/blob/master/src/json/svgsMetadata.json). The file is 
automatically generated every time the package is published.

All three callbacks take a single string argument, the ID of the tissue affected by the mouse event.

The state of a tissue is either not shown, shown, highlighted or selected. On `mouseover` the opacity is increased by 
0.2. You can read a more inclined description of the anatomogram behaviour in [the repository 
wiki](https://github.com/gxa/anatomogram/wiki).

## Building
To use the anatomogram in a browser you need to build and bundle the package:
```
npm run dist -- --output-public-path <URL>
```

`<URL>` is the URL (absolute or relative) from which you’ll be serving the anatomogram. **Remember to append a final 
slash!** This is required so that the code knows where to look for static assets (i.e. SVGs and PNGs). You can read more 
about this option in [Webpack’s documentation site](https://webpack.js.org/configuration/output/#output-publicpath).

After building, deployment of `anatomogramDemo.bundle.js` is optional, only if you want to host the demo component.

Include the following in your HTML:
```
<script src="<URL>/vendorCommons.bundle.js"></script>
<script src="<URL>/anatomogram.bundle.js"></script>

<script>
anatomogram.render(options, target)
</script>
```

### Building for a particular species
You can take out all the unnecessary SVGs and PNGs and change 
[`Anatomogram.defaultProps.species`](https://github.com/gxa/anatomogram/blob/master/src/Anatomogram.js#L56) to any of 
the supported species. You can see an example in [the `mouse` branch](https://github.com/gxa/anatomogram/tree/mouse). 

## Contribute

Read carefully [our authoring guidelines](https://github.com/gxa/anatomogram/blob/master/src/svg/README.md) before 
adding new tissues or updating IDs in an existing anatomogram or adding a new SVG.
 
Run `npm run parseSvgs` to parse the updated IDs. When you are finished run a local copy of the demo page:
```
webpack-dev-server -d
```

Go to `localhost:9000/html` and see that the tissues show up like you want them to.
