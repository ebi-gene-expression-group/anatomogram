import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import AnatomogramSvg from '../src/AnatomogramSvg'

describe(`AnatomogramSvg`, () => {
  test(`should render for a supported species`, () => {
    expect(
      shallow(<AnatomogramSvg 
        atlasUrl={''}
        idsWithMarkup={[]}
        onClick={jest.fn()}
        onMouseOut={jest.fn()}
        onMouseOver={jest.fn()}
        species={`tabula_muris`}
      />
    )).toMatchSnapshot();
  })

  test(`should not render for an unsupported species`, () => {
    expect(
      shallow(<AnatomogramSvg 
        atlasUrl={''}
        idsWithMarkup={[]}
        onClick={jest.fn()}
        onMouseOut={jest.fn()}
        onMouseOver={jest.fn()}
        species={`ovis_aries`}
      />
    )).toMatchSnapshot();
  })

  describe('callbacks', () => {
    it(`should call onClick`, () => {
      const onClickSpy = jest.fn();
      const wrapper = shallow(<AnatomogramSvg 
        atlasUrl={''}
        idsWithMarkup={[]}
        onClick={onClickSpy}
        onMouseOut={jest.fn()}
        onMouseOver={jest.fn()}
        species={`tabula_muris`}
      />);

      expect(wrapper).toMatchSnapshot();
      // wrapper.find('svg').simulate('click');
      // expect(onClickSpy).toHaveBeenCalledTimes(1);
    })

    it(`should call onMouseOut`, () => {
      const onMouseOutSpy = jest.fn();
      const wrapper = shallow(<AnatomogramSvg
        atlasUrl={''}
        idsWithMarkup={[]}
        onClick={jest.fn()}
        onMouseOut={onMouseOutSpy}
        onMouseOver={jest.fn()}
        species={`tabula_muris`}
      />);
    })

    it(`should call onMouseOver`, () => {
      const onMouseOverSpy = jest.fn();
      const wrapper = shallow(<AnatomogramSvg
        atlasUrl={''}
        idsWithMarkup={[]}
        onClick={jest.fn()}
        onMouseOut={jest.fn()}
        onMouseOver={onMouseOverSpy}
        species={`tabula_muris`}
      />);
    })

    

    
  })
})
