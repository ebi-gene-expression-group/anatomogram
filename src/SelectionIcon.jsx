import React from 'react';
import {ResolvePathToIcon} from './imagesAvailable.js';
import './SelectionIcon.less';

class SelectionIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img className={"selection-icon"} onClick={this.props.onClick}
                 src={ResolvePathToIcon(
                         this.props.pathToFolderWithBundledResources,
                         this.props.anatomogramType,
                         this.props.selected)} />
        );
    }
}

SelectionIcon.propTypes = {
    pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
    anatomogramType: React.PropTypes.oneOf([`brain`,`female`,`male`,`whole_plant`,`flower_parts`]).isRequired,
    selected: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default SelectionIcon;
