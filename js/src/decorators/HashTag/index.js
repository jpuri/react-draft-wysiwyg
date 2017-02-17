import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class Hashtag {

  constructor(config) {
    this.className = config.className;
    this.hashCharacter = config.hashCharacter || '#';
    this.separator = config.separator || ' ';
  }

  getHashtagComponent = () => {
    const className = this.className;
    return class HashtagComponent extends Component {
      static PropTypes = {
        children: PropTypes.object,
      }
      render() {
        const { children } = this.props;
        const text = children[0].props.text;
        return (
          <a href={text} className={classNames('rdw-hashtag-link', className)}>
            {children}
          </a>
        );
      }
    };
  };

  findHashtagEntities = (contentBlock, callback) => {
    let text = contentBlock.getText();
    let startIndex = 0;
    let counter = 0;

    for (;text.length > 0 && startIndex >= 0;) {
      if (text[0] === this.hashCharacter) {
        startIndex = 0;
        counter = 0;
        text = text.substr(this.hashCharacter.length);
      } else {
        startIndex = text.indexOf(this.separator + this.hashCharacter);
        if (startIndex >= 0) {
          text = text.substr(startIndex + (this.separator + this.hashCharacter).length);
          counter += startIndex + this.separator.length;
        }
      }
      if (startIndex >= 0) {
        const endIndex =
          text.indexOf(this.separator) >= 0 ? text.indexOf(this.separator) : text.length;
        const hashtagText = text.substr(0, endIndex);
        if (hashtagText && hashtagText.length > 0) {
          callback(counter, counter + hashtagText.length + this.hashCharacter.length);
          counter += this.hashCharacter.length;
        }
      }
    }
  };

  getHashtagDecorator = () => {
    return {
      strategy: this.findHashtagEntities,
      component: this.getHashtagComponent(),
    }
  };
}

const getDecorator = (config) => (new Hashtag(config)).getHashtagDecorator();

module.exports = getDecorator;
