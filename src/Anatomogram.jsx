import React from 'react';
import AnatomogramImage from './AnatomogramImage.jsx';
import SelectionIcon from './SelectionIcon.jsx';

class Anatomogram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedType: this.props.availableAnatomograms[0].type
        }
    }

    render() {
        return (
            <div className="gxaAnatomogram" style={{display: `table`, paddingTop: `4px`}}>
                <div style={{display: `table-row`}}>
                    <div style={{display: `table-cell`, verticalAlign: `top`}}>
                        {this._anatomogramSelectImageButtons()}
                    </div>
                    <AnatomogramImage
                        key={this.state.selectedType}
                        file={this._selectedAnatomogram().path}
                        allSvgPathIds={this.props.allSvgPathIds || this._selectedAnatomogram().ids}
                        {...this.props} />
                </div>
            </div>
        );
    }

    _anatomogramSelectImageButtons() {
        return (
            this.props.availableAnatomograms.length < 2 ?
                [] :
                this.props.availableAnatomograms
                .map(availableAnatomogram =>
                    (
                        <SelectionIcon
                            key={`${availableAnatomogram.type}_toggle`}
                            pathToResources={this.props.pathToResources}
                            anatomogramType={availableAnatomogram.type}
                            selected={this.state.selectedType === availableAnatomogram.type}
                            onClick={() => { this._afterUserSelectedAnatomogram(availableAnatomogram.type); }}/>
                    )
                )
        );
    }

    _afterUserSelectedAnatomogram(newSelectedType) {
        if (newSelectedType !== this.state.selectedType) {
            this.setState({ selectedType: newSelectedType });
        }
    }

    _selectedAnatomogram() {
        return (
            this.props.availableAnatomograms
            .filter(e => e.type === this.state.selectedType)
            .concat({
                type: `_`,
                path: `__invalid__.svg`,
                ids: []
            })[0]
        );
    }
}

Anatomogram.propTypes = {
    availableAnatomograms : React.PropTypes.arrayOf(
        React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            path: React.PropTypes.string.isRequired,
            ids: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
        })
    ).isRequired,
    pathToResources: React.PropTypes.string.isRequired,
    expressedTissueColour: React.PropTypes.string.isRequired,
    hoveredTissueColour: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    whenMousedOverIdsChange: React.PropTypes.func,
    allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string),
    idsToBeHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default Anatomogram;
