/* @flow */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
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
      </Dropdown>
    ).node.type).to.equal('div');
  });

  it('should expand drop-down when first element is clicked', () => {
    const dropdown = mount(
      <Dropdown
        modalHandler={new ModalHandler()}
        >
        <span>test</span>
        <DropdownOption>test1</DropdownOption>
      </Dropdown>
    );
    dropdown.childAt(0).simulate('click');
    expect(dropdown.nodes[0].signalExpanded).to.equal(true);
  });

  it('should toggle expansion when enter is clicked', () => {
    const dropdown = mount(
      <Dropdown
        modalHandler={new ModalHandler()}
        >
        <span>test</span>
        <DropdownOption>test1</DropdownOption>
      </Dropdown>
    );
    dropdown.childAt(0).simulate('keydown', { key: 'Enter' });
    expect(dropdown.state().expanded).to.equal(true);
    dropdown.childAt(0).simulate('keydown', { key: 'Enter' });
    expect(dropdown.state().expanded).to.equal(false);
  });
});
