import URI from 'urijs'

/*
Note the require!
We want webpack to bundle these up and replace them with context modules:
https://webpack.github.io/docs/context.html
*/

const resolveUrlToAnatomogram = (urlToResources,fileName) => (
    URI(require(`./svg/${fileName}`), urlToResources).toString()
)

const resolveUrlToIcon = (urlToResources, selectedType, anatomogramType) => (
	URI(require(
		`./img/${selectedType === anatomogramType ? `` : `un`}selected${anatomogramType}.png`
	), urlToResources)
	.toString()
)

export {resolveUrlToAnatomogram, resolveUrlToIcon}
