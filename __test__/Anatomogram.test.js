import React from 'react'
import { shallow } from 'enzyme'

import Anatomogram from '../src/Anatomogram'

describe(`Anatomogram`, () => {

  test(`should render for a supported species`, () => {
    expect(shallow(<Anatomogram
      idsWithMarkup={[]}
      onClick={jest.fn()}
      onMouseOut={jest.fn()}
      onMouseOver={jest.fn()}
      species={`mus_musculus`}
    />)).toMatchSnapshot()
  })

  test(`should not render for an unsupported species`, () => {
    expect(shallow(<Anatomogram atlasUrl={``} species={`ovis_aries`} />).children()).toHaveLength(0)
  })

})
