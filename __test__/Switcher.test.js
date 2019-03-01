import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Switcher from '../src/Switcher'

import svgsMetadata from '../src/json/svgsMetadata.json'
import {getAnatomogramViews, getDefaultView} from '../src/Assets'

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
    allSpecies.forEach((species) => {
      expect(mount(<Switcher {...requiredProps} species={species}/>).find(`img`)).toHaveLength(getAnatomogramViews(species).length)
    })
  })

  test(`should respond to onClick events with the anatomogram view`, () => {
    const onButtonClick = jest.fn()
    const wrapper = mount(<Switcher {...requiredProps} species={`homo_sapiens`} onChangeView={onButtonClick}/>)
    wrapper.find(`img`).first().simulate(`click`)
    wrapper.find(`img`).last().simulate(`click`)
    expect(onButtonClick.mock.calls.length).toBe(2)
    expect(onButtonClick.mock.calls[0][0]).toBe(getAnatomogramViews(`homo_sapiens`)[0])
    expect(onButtonClick.mock.calls[1][0]).toBe(getAnatomogramViews(`homo_sapiens`)[2])
  })

  allSpecies.forEach((species) => {
    test(`matches snapshot for ${species}`, () => {
      const tree = renderer.create(<Switcher {...requiredProps} species={species} selectedView={getDefaultView(species)}/>).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
