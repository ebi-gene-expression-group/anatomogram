import React from 'react'
import ReactDOM from 'react-dom'

import Anatomogram from './Anatomogram'

const render = function (options, target) {
  ReactDOM.render(<Anatomogram {...options}/>, document.getElementById(target))
}

export {Anatomogram as default, render}
