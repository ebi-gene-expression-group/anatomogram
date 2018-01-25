import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import Anatomogram from '../src/Anatomogram'

describe(`Anatomogram`, () => {

  test(`should not render for an unsupported species`, function() {
    expect(shallow(<Anatomogram species={`ovis_aries`} />).children()).toHaveLength(0)
  })

})
