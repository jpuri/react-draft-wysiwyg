/* @flow */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Dropdown from '..';
import DropdownOption from '../../DropdownOption';
import ModalHandler from '../../../../event-handler/modals';

describe('Dropdown test suite', () => {
  it('should have a div when rendered', () => {
    expect(shallow(
      <Dropdown
        modalHandler={new ModalHandler()}
      >
        <span>test</span>
        <DropdownOption>test1</DropdownOption>
      </Dropdown>,
    ).node.type).to.equal('div');
  });
});
