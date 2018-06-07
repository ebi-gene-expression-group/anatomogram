import React from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'

import {getAnatomogramViews} from './Assets'
import styles from './Switcher.css'

const loadIcon = (view, selectedView) => require(`./img/${view}.${view === selectedView ? `` : `un`}selected.png`)
const resolve = (uri, baseUrl) => URI(uri).is(`absolute`) ? URI(uri) : URI(uri, baseUrl)

const Switcher = ({atlasUrl, species, selectedView, onChangeView}) =>
  <div className={styles.switcher}>
    {getAnatomogramViews(species).map((view) =>
      <img key={view} className={styles.switcherIcon} onClick={() => onChangeView(view)}
           src={resolve(loadIcon(view, selectedView), atlasUrl).toString()} />
    )}
  </div>

Switcher.propTypes = {
  atlasUrl: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  selectedView: PropTypes.string,
  onChangeView: PropTypes.func.isRequired
}

Switcher.defaultProps = {
  atlasUrl: `https://www.ebi.ac.uk/gxa/`
}

export default Switcher
