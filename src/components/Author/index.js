/* @flow */

import React, { Component } from 'react';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Demo1 extends Component {

  render() {
    return (
      <div className="author-root">
        I am <a target="_blank" href="https://twitter.com/jyopur" rel="noopener noreferrer">Jyoti Puri</a>, software developer based in New Delhi.
        I love functional programming and solving complex problems.<br /><br />
        Original motivation and sponsorship for this work came from <a target="_blank" href="http://www.ipaoo.com/" rel="noopener noreferrer">iPaoo</a>.
        I am thankful to them for allowing the Editor to be open-sourced.
        I am also thankful to the developers using this Editor, their feedbacks are always so motivating. And to the awesome contributors for their great work 👍<br /><br />
        I am freelancer. You can reach me for consulting work related to react-draft-wysiwyg at jyotipuri@gmail.com.
      </div>
    );
  }
}
