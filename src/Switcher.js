import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import './Switcher.css'

import {resolveUrlToIcon} from './Assets.js'

const Switcher = ({anatomogramTypes, urlToResources, selectedType, onChangeSelectedType}) => (
    anatomogramTypes.length > 1 &&
    <div className={`gxa-anatomogram-switcher`}>
        {anatomogramTypes.map((anatomogramType) =>
          <img key={anatomogramType}
               className={`gxa-selection-icon`}
               onClick={() => onChangeSelectedType(anatomogramType)}
               src={resolveUrlToIcon(urlToResources, selectedType, anatomogramType)} />
        )}
    </div>
)

Switcher.propTypes = {
  anatomogramTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedType: PropTypes.string.isRequired,
  onChangeSelectedType: PropTypes.func.isRequired,
  urlToResources: PropTypes.string.isRequired
}

export default Switcher
