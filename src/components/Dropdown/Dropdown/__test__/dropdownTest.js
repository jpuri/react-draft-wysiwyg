/* @flow */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Dropdown from '..';
import DropdownOption from '../../DropdownOption';
import ModalHandler from '../../../../event-handler/modals';

describe('Dropdown test suite', () => {
  it('should have a div when rendered', () => {
    expect(mount(
      <Dropdown
        modalHandler={new ModalHandler()}
      >
        <span>test</span>
        <DropdownOption>test1</DropdownOption>
      </Dropdown>,
    ).childAt(0).type()).to.equal('div');
  });
});
