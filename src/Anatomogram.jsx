const React = require(`react`);
const AnatomogramImage = require(`./AnatomogramImage.jsx`);
const SelectionIcon = require(`./SelectionIcon.jsx`);

const Anatomogram = React.createClass({
    propTypes: {
        pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
        expressedTissueColour: React.PropTypes.string.isRequired,
        hoveredTissueColour: React.PropTypes.string.isRequired,
        availableAnatomograms : React.PropTypes.arrayOf(
            React.PropTypes.shape({
                type:React.PropTypes.string.isRequired,
                path:React.PropTypes.string.isRequired,
                ids: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
            })
        ).isRequired,
        height: React.PropTypes.number.isRequired,
        whenMousedOverIdsChange: React.PropTypes.func,
        allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string),
        idsToBeHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    getInitialState() {
        return { selectedType: this.props.availableAnatomograms[0].type };
    },

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
    },

    _anatomogramSelectImageButtons() {
        return (
            this.props.availableAnatomograms.length < 2 ?
                [] :
                this.props.availableAnatomograms
                .map(availableAnatomogram =>
                    (
                        <SelectionIcon
                            key={`${availableAnatomogram.type}_toggle`}
                            pathToFolderWithBundledResources={this.props.pathToFolderWithBundledResources}
                            anatomogramType={availableAnatomogram.type}
                            selected={this.state.selectedType === availableAnatomogram.type}
                            onClick={() => { this._afterUserSelectedAnatomogram(availableAnatomogram.type); }}/>
                    )
                )
        );
    },

    _afterUserSelectedAnatomogram(newSelectedType) {
        if (newSelectedType !== this.state.selectedType) {
            this.setState({ selectedType: newSelectedType });
        }
    },

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
    },
});

module.exports = Anatomogram;
