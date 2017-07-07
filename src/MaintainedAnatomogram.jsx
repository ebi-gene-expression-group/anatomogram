import React from 'react';
import ReactDOM from 'react-dom';
import prescribeAnatomogram from './MaintainAnatomogram.js'

const MaintainedAnatomogram = React.createClass({
    propTypes: {
        svgFile: (props, propName, componentName) => {
            if(propName === `svgFile`){
                if(typeof props[propName]!== `string`){
                    return new Error(`Expected string to specify file, got: ${props[propName]}`);
                }
                if(!props[propName]){
                    return new Error(`Path to file empty!`);
                }
            }
            return ``;
        },
		dimensions: React.PropTypes.shape({
			width: React.PropTypes.number.isRequired,
			height: React.PropTypes.number.isRequired
		}).isRequired,
		whenMousedOverIdsChange: React.PropTypes.func
    },

    componentDidMount() {
        this._draw();
    },

	componentDidUpdate(){
		this._draw();
	},

    _draw() {
        prescribeAnatomogram(
			Object.assign({}, this.props, {domNode: ReactDOM.findDOMNode(this._anatomogram)})
		)
    },

    render () {
	    return (
	        <span>
	            <svg ref={c => this._anatomogram = c}
					style={{
						display: "table-cell",
						width: this.props.dimensions.width+"px",
						height: this.props.dimensions.height+"px"
					}}
					/>
	        </span>
		);
    }
});

export default MaintainedAnatomogram
