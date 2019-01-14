import React from 'react'
import { mount, shallow } from 'enzyme'

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
        species={`mus_musculus`}
      />
    )).toMatchSnapshot();
  });

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
  });

  it(`should call onInjectedCallback when the svg is injected`, (done) => {
    const onInjectedCallbackSpy = jest.fn(() => {
      done();
    });
    mount(<AnatomogramSvg 
      atlasUrl={'https://www.ebi.ac.uk/gxa/'}
      idsWithMarkup={[]}
      onClick={jest.fn()}
      onInjectedCallback={onInjectedCallbackSpy}
      onMouseOut={jest.fn()}
      onMouseOver={jest.fn()}
      species={`mus_musculus`}
    />);
  });
});
