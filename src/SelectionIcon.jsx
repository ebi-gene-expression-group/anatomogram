import React from 'react';
import {resolvePathToIcon} from './imagesAvailable.js';
import './SelectionIcon.less';

const SelectionIcon = props =>
    <img className={"selection-icon"} onClick={props.onClick}
         src={resolvePathToIcon(props.pathToResources, props.anatomogramType, props.selected)} />;

SelectionIcon.propTypes = {
    pathToResources: React.PropTypes.string.isRequired,
    anatomogramType: React.PropTypes.oneOf([`brain`,`female`,`male`,`whole_plant`,`flower_parts`]).isRequired,
    selected: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default SelectionIcon;
