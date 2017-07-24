import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import './Switcher.css'

const resolveUrlToIcon = (urlToResources, selectedType, anatomogramType, ) =>
  URI(`img/${selectedType === anatomogramType ? `` : `un`}selected${anatomogramType}.png`, urlToResources).toString()

const Switcher = ({anatomogramTypes, urlToResources, selectedType, onChangeSelectedType}) => (
    anatomogramTypes.length > 1 &&
    <div style={{display: `inline-block`, verticalAlign: `top`, width: `10%`, maxWidth: `32px`}}>
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
