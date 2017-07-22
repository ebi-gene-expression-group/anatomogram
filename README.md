Expression Atlas Anatomogram 
============================================

[![Build Status](https://travis-ci.org/gxa/atlas-anatomogram.svg?branch=master)](https://travis-ci.org/gxa/atlas-anatomogram) [![Coverage Status](https://coveralls.io/repos/github/gxa/atlas-anatomogram/badge.svg?branch=master)](https://coveralls.io/github/gxa/atlas-anatomogram?branch=master) [![Dependency Status](https://gemnasium.com/badges/github.com/gxa/atlas-anatomogram.svg)](https://gemnasium.com/github.com/gxa/atlas-anatomogram) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

This is an anatomogram for [Expression Atlas](http://www.ebi.ac.uk/gxa) that we use to illustrate the experiments.

[See demo here](https://gxa.github.io/anatomogram-demo/index.html).

The ontology IDs are sourced from [Uberon](www.uberon.org), [EFO](www.ebi.ac.uk/efo) and [Plant Ontology](www.plantontology.org/).

To install:
`npm install --save anatomogram`

You can reuse it as a React component or add a non-React wrapper. For example uses, see the code for the demo component and how we use it in github.com/gxa or get in touch.

Contribute
----------

To update the anatomograms or ontology IDs read our [authoring guidelines](https://github.com/gxa/anatomogram/blob/master/svg-assets/README.md). Run `npm run parseSvgs` to parse the updated IDs.

To add new anatomograms put them in the `svg-assets` directory, then edit the config `src/json/svgs.json`. The format is pretty straightforward.

When you are finished run a local copy of the demo page:
```
webpack-dev-server -d
```

Go to `localhost:9000/html` and see that the tissues show up like you want them to.
