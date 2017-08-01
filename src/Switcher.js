import React from 'react'
import PropTypes from 'prop-types'

import {getAnatomogramViews} from './Assets'
import './Switcher.css'

const loadIcon = (view, selectedView) => require(`./img/${view}.${view === selectedView ? `` : `un`}selected.png`)

const Switcher = ({species, selectedView, onChangeView}) =>
  <div className={`gxa-anatomogram-switcher`}>
    {getAnatomogramViews(species).map((view) =>
      <img key={view} className={`gxa-anatomogram-switcher-icon`} onClick={() => onChangeView(view)}
           src={loadIcon(view, selectedView)} />
    )}
  </div>

Switcher.propTypes = {
  species: PropTypes.string.isRequired,
  selectedView: PropTypes.string,
  onChangeView: PropTypes.func.isRequired
}

export default Switcher
