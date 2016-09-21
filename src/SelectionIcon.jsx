const Path = require(`path`);
const React = require(`react`);
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
      <img className={"selection-icon"} onClick={this.props.onClick} src={this._resolvePathToImage()}/>
    );
  },

  shouldComponentUpdate (nextProps) {
    return this.props.selected !== nextProps.selected;
  },

  _resolvePathToImage () {
    return Path.resolve(
          this.props.pathToFolderWithBundledResources,
          Path.basename(
              require(`../assets/icons/` + this.props.anatomogramType + `_` + (this.props.selected ? `selected` : `unselected`) + `.png`))
    );
  }
});

module.exports = SelectionIcon;
