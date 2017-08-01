import React from 'react'
import {shallow} from 'enzyme'

import Anatomogram from '../src/Anatomogram'

describe(`Anatomogram`, () => {

  test(`should not render for an unsupported species`, function() {
    expect(shallow(<Anatomogram species={`ovis_aries`} />).children()).toHaveLength(0)
  })

})
