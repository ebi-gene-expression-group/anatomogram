Expression Atlas Anatomogram 
============================================

[![Build Status](https://travis-ci.org/gxa/atlas-anatomogram.svg?branch=master)](https://travis-ci.org/gxa/atlas-anatomogram) [![Coverage Status](https://coveralls.io/repos/github/gxa/atlas-anatomogram/badge.svg?branch=master)](https://coveralls.io/github/gxa/atlas-anatomogram?branch=master) [![Dependency Status](https://gemnasium.com/badges/github.com/gxa/atlas-anatomogram.svg)](https://gemnasium.com/github.com/gxa/atlas-anatomogram)

This is an anatomogram for [Expression Atlas](http://www.ebi.ac.uk/gxa) that we use to illustrate the experiments.

[See demo here](https://gxa.github.io/anatomogram/html/)

The ontology IDs are sourced from [Uberon](www.uberon.org), [EFO](www.ebi.ac.uk/efo) and [Plant Ontology](www.plantontology.org/).

To install:
`npm install --save anatomogram`

You can reuse it as a React component or add a non-React wrapper. For example uses, see the code for the demo component and how we use it in github.com/gxa or get in touch.

Contribute
----------


##### Development

Required:
```
npm, webpack, webpack-dev-server
```

To update the anatomograms or ontology IDs edit them in the `resources/svg` directory, then run
```
scripts/idsForSvgs.py
```
This regenerates the file `resources/json/idsForSvgs.svg`.

To add new anatomograms put them in the `resources/svg` directory, then edit the config `resources/json/svgsForSpecies.json`.


When you are finished run a local copy of the demo page:
```
webpack-dev-server -d
```
Go to localhost:9000/html and see that the tissues show up like you want them to.

##### Publish
Regenerate the bundled files:
```
webpack
```
Examine the output and see that there were no errors.
```
git add . && git commit -m "Example update"
git show # see the changes you made
git push
```
Go to the demo page and see that the change shows up there.

Optionally:
bump the package version, publish on npm, then in Atlas require the newest version, and reinstall it.
