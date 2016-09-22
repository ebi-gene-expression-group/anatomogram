const React = require(`react`);
const ResolvePathToIcon = require(`./imagesAvailable.js`).ResolvePathToIcon;
require(`./SelectionIcon.less`);

const SelectionIcon = React.createClass({
  propTypes: {
    pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
    anatomogramType: React.PropTypes.oneOf([`brain`,`female`,`male`,`whole_plant`,`flower_parts`]).isRequired,
    selected: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render () {
    return (
      <img className={"selection-icon"} onClick={this.props.onClick}
           src={ResolvePathToIcon(this.props.pathToFolderWithBundledResources, this.props.anatomogramType, this.props.selected)}/>
    );
  },

  shouldComponentUpdate (nextProps) {
    return this.props.selected !== nextProps.selected;
  }
});

module.exports = SelectionIcon;
