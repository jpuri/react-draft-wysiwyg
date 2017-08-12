import React, { Component } from 'react';
import Installation from './Installation';
import Usage from './Usage';
import Props from './Props';
import ARIASupport from './ARIASupport';
import DataConversion from './DataConversion';
import './styles.css';

export default () =>
<div className="docs-root">
  <Installation />
  <Usage />
  <Props />
  <ARIASupport />
  <DataConversion />
</div>;
