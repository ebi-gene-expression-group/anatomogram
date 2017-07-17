import React from 'react'
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer'
import sinon from 'sinon'

import Switcher from '../src/Switcher'
import availableSpecies from '../src/svgs.json'

describe(`Anatomogram switcher`, () => {
  // it(`should render without throwing an error`, () => {
  //   expect(shallow(<Switcher />).contains(<div className="foo">Bar</div>)).toBe(true)
  // })
  const requiredProps = {
    anatomogramTypes: [`female`, `male`],
    selectedType: `female`,
    onClick: () => {},
    urlToResources: ``
  }

  test(`should contain as many buttons as anatomogram types`, function() {
    expect(shallow(<Switcher {...requiredProps} anatomogramTypes={[]} selectedType={``}/>).find(`img`)).toHaveLength(0)
    expect(shallow(<Switcher {...requiredProps} />).find(`img`)).toHaveLength(2)
  })

  test(`should contain img selectable by class "gxa-selection-icon"`, () => {
    expect(shallow(<Switcher {...requiredProps} anatomogramTypes={[]} selectedType={``}/>).find(`.gxa-selection-icon`)).toHaveLength(0)
    expect(shallow(<Switcher {...requiredProps} />).find(`.gxa-selection-icon`)).toHaveLength(2)
  })

  test(`should respond to onClick events with the anatomogram type`, () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<Switcher {...requiredProps} onClick={onButtonClick}/>)
    wrapper.find(`img`).first().simulate(`click`);
    wrapper.find(`img`).last().simulate(`click`);
    expect(onButtonClick.calledTwice).toBe(true);
    expect(onButtonClick.calledWith(`female`)).toBe(true);
    expect(onButtonClick.calledWith(`male`)).toBe(true);
  })

  Object.keys(availableSpecies).forEach((species) => {
    test(`matches snapshot for ${species}`, () => {
      const anatomogramTypes = availableSpecies[species]
      const tree = renderer.create(<Switcher {...requiredProps} anatomogramTypes={anatomogramTypes} selectedType={anatomogramTypes[0] || ``}/>).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
