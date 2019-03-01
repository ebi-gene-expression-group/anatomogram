import React from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'
import styled from 'styled-components'

import {getAnatomogramViews} from './Assets'

const loadIcon = (view, selectedView) => require(`./img/${view}.${view === selectedView ? `` : `un`}selected.png`)
const resolve = (uri, baseUrl) => URI(uri).is(`absolute`) ? URI(uri) : URI(uri, baseUrl)

const IconWrapperDiv = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 10%;
  max-width: 44px;
  line-height: 0;
`

const IconImg = styled.img`
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: auto;
  padding: 2px;

  &:hover {
    border: 1px solid orange;
    background: lightgoldenrodyellow;
    cursor: pointer;
  }
`

const Switcher = ({atlasUrl, species, selectedView, onChangeView}) =>
  <IconWrapperDiv>
    {getAnatomogramViews(species).map((view) =>
      <IconImg
        key={view}
        onClick={() => onChangeView(view)}
        src={resolve(loadIcon(view, selectedView), atlasUrl).toString()} />
    )}
  </IconWrapperDiv>

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
