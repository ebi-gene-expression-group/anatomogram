/*
Change colours and opacity on bits of a Snap SVG object
In: {svg : Snap object,
	instruction: [{id, colour, opacity}]
}
*/
const _recursivelyChangeProperties = (svgElement, colour, opacity) => {
	if (svgElement) {
		svgElement.selectAll(`*`).forEach(_recursivelyChangeProperties)
		svgElement.attr({"fill": colour, "fill-opacity": opacity});
	}
}

const colourForPathId = (svg, {id : svgPathId, colour, opacity}) => {
	let el = svg.select(`#${svgPathId}`);
	if (el && el.type === `use`) {
		_recursivelyChangeProperties(svg.select(el.node.getAttribute(`xlink:href`)), colour, opacity);
	}
	_recursivelyChangeProperties(el, colour, opacity);
}

const colourPathIds = ({svg, instructions}) => {
	instructions.forEach(instruction => {
		colourForPathId(svg,instruction)
	});
}

export default colourPathIds;
