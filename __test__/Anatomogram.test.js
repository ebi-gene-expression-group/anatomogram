import React from 'react'
import Enzyme from 'enzyme'
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import Anatomogram from '../src/Anatomogram'

describe(`Anatomogram`, () => {

  test(`should render for a supported species`, () => {
    expect(shallow(<Anatomogram species={`tabula_muris`} />)).toMatchSnapshot();
  })

  test(`should not render for an unsupported species`, () => {
    expect(shallow(<Anatomogram atlasUrl={''} species={`ovis_aries`} />).children()).toHaveLength(0)
  })

})
