
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

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

const colourSvgElements = ({svg, instructions}) => {
	instructions.forEach(instruction => {
		colourForPathId(svg,instruction)
	});
}

const registerHoverEvents = ({svg,allSvgPathIds, events: {onIdMouseover, onIdMouseout}}) => {
	if (svg) {  // Sometimes svg is null... why?
		const attachCallbacks = (svgElement, svgPathId) => {
			if (svgElement) {
				svgElement.mouseover(() => { onIdMouseover(svgPathId) });
				svgElement.mouseout(() => { onIdMouseout(svgPathId) });
			}
		};

		allSvgPathIds.forEach(svgPathId => {
			const svgElement = svg.select(`#${svgPathId}`);
			attachCallbacks(svgElement, svgPathId);
			if(svgElement && svgElement.type === `use`){
				attachCallbacks(svg.select(svgElement.node.getAttribute(`xlink:href`)), svgPathId);
			}
		});
	}
}

const drawOnSvgDomNode = ({domNode,instructions}) => {
	const svg = Snap(domNode).select(`#LAYER_EFO`);
	svg && colourSvgElements({svg, instructions})
}

const loadSvgOntoDom = ({
	svgFile,
	domNode,
	dimensions: {height, width},
	events,
	elementsInitialLayout
	}) => {
	let svgCanvas = Snap(domNode),
		allElements = svgCanvas.selectAll(`*`);

	if (allElements) {
		allElements.remove();
	}

	Snap.load(
		svgFile,
		fragment => {
			const svg = fragment.select(`#LAYER_EFO`)
			colourSvgElements({svg, instructions: elementsInitialLayout})
			registerHoverEvents({svg, allSvgPathIds: elementsInitialLayout.map(x => x.id), events})

			fragment.selectAll(`svg > g`).forEach(g => {
				g.transform(`S1.6,0,0`);
				svgCanvas.append(g);
			});
			const img = fragment.select(`#ccLogo`);
			if (img) {
				// svgCanvas.node.clientHeight and svgCanvas.node.clientWidth is more “correct” but are 0 in Firefox
				const heightTranslate = Number.parseInt(height) - 15;
				const widthTranslate = Number.parseInt(width) / 2 - 40;
				img.transform(`t${widthTranslate},${heightTranslate}`);
				svgCanvas.append(img);
			}
		}
	);
}

export {
	loadSvgOntoDom,
	drawOnSvgDomNode
}
