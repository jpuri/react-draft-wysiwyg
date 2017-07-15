/* @flow */

import React, { Component } from 'react';
import { Editor } from '../../src';

import './styles.css';

class I18n extends Component {

  state: any = {
    locale: 'en',
  };

  onLocaleChange: Function = (event) => {
    this.setState({
      locale: event.target.value,
    });
  };

  render() {
    const { locale } = this.state;
    return (
      <div className="rdw-storybook-root">
        <div className="rdw-storybook-locale-wrapper">
          <span className="rdw-storybook-locale-lbl">Select Language</span>
          <select value={locale} onChange={this.onLocaleChange}>
            <option value="zh">Chinese</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="ko">Korean</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <Editor
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          localization={{
            locale,
          }}
        />
      </div>
    );
  }
}

export default I18n;
