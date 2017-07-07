
import {loadSvgOntoDom, drawOnSvgDomNode} from './MaintainSvgCanvas.js'


//http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
const ArraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
const MaxOverlappingTissues = 5


const areInstructionsEquivalent = (instruction1, instruction2) => (
    instruction1.id == instruction2.id
    && instruction1.colour == instruction2.colour
    && instruction1.opacity == instruction2.opacity
)

const diffInstructions = (oldInstructions, newInstructions) => (
    newInstructions.filter(instruction => ! oldInstructions.some(oldInstruction => areInstructionsEquivalent(oldInstruction, instruction) ))
)

//prescribedLevels array of arrays of size k, one of them containing id, scheme array of objects of size k
const createInstruction = ({ highlightingLevels, id, highlightingScheme }) =>  (
    Object.assign({id: id}, highlightingScheme[highlightingLevels.findIndex(l => l.indexOf(id)>-1)])
)

const highlightingScheme = ({expressedTissueColour, hoveredTissueColour}) => [
    {colour: hoveredTissueColour, opacity: 0.7 },
    {colour: expressedTissueColour, opacity: 0.5 },
    {colour: `gray`, opacity: 0.5 }
]

const highlightingLevels = ({
	allIds,
    idsMousedOver,
	prescription : {
		idsPrescribedHighlighted,
		idsPrescribedNoticeable
	}
}) => [
    [].concat(idsMousedOver, idsPrescribedHighlighted),
    idsPrescribedNoticeable,
    allIds
]

const drawInstructions = (currentState) => (
	currentState.desiredLayout.allIds
	.map((id)=> createInstruction({
		highlightingLevels:
			highlightingLevels(Object.assign({}, currentState.desiredLayout, {idsMousedOver: currentState.idsMousedOver})),
		highlightingScheme:
			highlightingScheme(currentState.desiredLayout.colours),
		id
	}))
)

const blankState = () => ({
	svgFile : "",
	desiredLayout: {
		prescription: {
			idsPrescribedHighlighted: [],
			idsPrescribedNoticeable: [],
		},
		allIds: [],
		scheme: []
	},
	domNode: null,
	idsMousedOver: []
})

/*
From here onwards, functions modify the local state
*/

let currentState = blankState()

const onDesiredLayoutChange = ({domNode, desiredLayout}) => {
	const previousDrawInstructions = drawInstructions(currentState)
	currentState.desiredLayout = desiredLayout
	drawOnSvgDomNode({
		domNode,
		instructions : diffInstructions(previousDrawInstructions, drawInstructions(currentState))
	})
}

const onMouseoverIdsChange = ({domNode, whenMousedOverIdsChange, idsMousedOver}) => {
	const previousIdsMousedOver = currentState.idsMousedOver
	if(!ArraysEqual(previousIdsMousedOver, idsMousedOver)){
		const previousDrawInstructions = drawInstructions(currentState)
		currentState.idsMousedOver = idsMousedOver
		drawOnSvgDomNode({
			domNode,
			instructions : diffInstructions(previousDrawInstructions, drawInstructions(currentState))
		})
		whenMousedOverIdsChange(idsMousedOver,previousIdsMousedOver)
	}
}

const prescribeAnatomogram = ({domNode, svgFile, dimensions, whenMousedOverIdsChange, desiredLayout}) => {
	if(svgFile!=currentState.svgFile || domNode!=currentState.domNode){
		currentState = blankState()
		currentState.svgFile = svgFile
		currentState.domNode = domNode
		currentState.desiredLayout = desiredLayout
		loadSvgOntoDom({
			svgFile,
			domNode,
			dimensions,
			elementsInitialLayout: drawInstructions(currentState),
			events: {
				onIdMouseover : (svgPathId) => {
					onMouseoverIdsChange({
						domNode,
						whenMousedOverIdsChange,
						idsMousedOver: [...currentState.idsMousedOver, svgPathId].slice(-MaxOverlappingTissues)
					})
				},
				onIdMouseout : (svgPathId) => {
					onMouseoverIdsChange({
						domNode,
						whenMousedOverIdsChange,
						idsMousedOver: currentState.idsMousedOver.map(el => el === svgPathId ? `` : el).filter(el=>el)
					})
				}
			}
		})
	} else if (desiredLayout != currentState.desiredLayout) {
		onDesiredLayoutChange({domNode, desiredLayout})
	}
}

export default prescribeAnatomogram
