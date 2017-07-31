import React from 'react'
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer'
import sinon from 'sinon'

import Switcher from '../src/Switcher'

import svgsMetadata from '../src/json/svgsMetadata.json'
import {getAnatomogramViews} from '../src/Assets'

const unique = (value, index, self) => self.indexOf(value) === index
const allSpecies = svgsMetadata
  .map((svgMetadata) => svgMetadata.species)
  .filter(unique)
  .sort()

describe(`Anatomogram switcher`, () => {
  const requiredProps = {
    onChangeView: () => {}
  }

  test(`should contain as many buttons as views are defined for a species`, function() {
    expect(shallow(<Switcher {...requiredProps} species={``} />).find(`img`)).toHaveLength(0)
    expect(shallow(<Switcher {...requiredProps} species={`foobar`} />).find(`img`)).toHaveLength(0)

    allSpecies.forEach((species) => {
      expect(shallow(<Switcher {...requiredProps} species={species}/>).find(`img`)).toHaveLength(getAnatomogramViews(species).length)
    })
  })

  test(`should contain img selectable by class "gxa-anatomogram-switcher-icon"`, () => {
    expect(shallow(<Switcher {...requiredProps} species={``} />).find(`.gxa-anatomogram-switcher-icon`)).toHaveLength(0)
    expect(shallow(<Switcher {...requiredProps} species={`homo_sapiens`}/>).find(`.gxa-anatomogram-switcher-icon`)).toHaveLength(3)
  })

  test(`should respond to onClick events with the anatomogram view`, () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<Switcher {...requiredProps} species={`homo_sapiens`} onChangeView={onButtonClick}/>)
    wrapper.find(`img`).first().simulate(`click`);
    wrapper.find(`img`).last().simulate(`click`);
    expect(onButtonClick.calledTwice).toBe(true);
    expect(onButtonClick.calledWith(getAnatomogramViews(`homo_sapiens`)[0])).toBe(true);
    expect(onButtonClick.calledWith(getAnatomogramViews(`homo_sapiens`)[2])).toBe(true);
  })

  allSpecies.forEach((species) => {
    test(`matches snapshot for ${species}`, () => {
      const tree = renderer.create(<Switcher {...requiredProps} species={species} selectedView={``}/>).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
