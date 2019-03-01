import React from 'react'
import { mount, shallow } from 'enzyme'

import AnatomogramSvg from '../src/AnatomogramSvg'

describe(`AnatomogramSvg`, () => {
  test(`should render for a supported species`, () => {
    expect(
      shallow(<AnatomogramSvg
        atlasUrl={``}
        idsWithMarkup={[]}
        onClick={jest.fn()}
        onMouseOut={jest.fn()}
        onMouseOver={jest.fn()}
        species={`mus_musculus`}
      />)
    ).toMatchSnapshot()
  })

  test(`should not render for an unsupported species`, () => {
    expect(
      shallow(<AnatomogramSvg
        atlasUrl={``}
        idsWithMarkup={[]}
        onClick={jest.fn()}
        onMouseOut={jest.fn()}
        onMouseOver={jest.fn()}
        species={`ovis_aries`}
      />)
    ).toMatchSnapshot()
  })

  test(`should call onInjected when the svg is injected`, (done) => {
    // This is a neat feature of Jest for async code.
    // If `done` is called, the test will pass, otherwise it fails - default timeout is 5000ms.
    // https://jestjs.io/docs/en/asynchronous#callbacks
    const onInjectedSpy = jest.fn(() => {
      done()
    })

    mount(<AnatomogramSvg
      atlasUrl={`https://www.ebi.ac.uk/gxa/`}
      idsWithMarkup={[]}
      onClick={jest.fn()}
      onInjected={onInjectedSpy}
      onMouseOut={jest.fn()}
      onMouseOver={jest.fn()}
      species={`mus_musculus`}
    />)
  })
})
