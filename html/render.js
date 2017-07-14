import React from 'react'
import ReactDOM from 'react-dom'

import Anatomogram from '../src/index.js'

const render = function (options, target) {
  ReactDOM.render(<Anatomogram {...options} />, document.getElementById(target))
}

export {render}
