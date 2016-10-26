import { fromJS } from 'immutable';
import bold from '../../../images/bold.svg';
import italic from '../../../images/italic.svg';
import underline from '../../../images/underline.svg';
import strikethrough from '../../../images/strikethrough.svg';
import code from '../../../images/code.svg';

export default fromJS({
  inline: {
    visible: true,
    inDropdown: true,
    bold: { visible: true, icon: bold },
    italic: { visible: true, icon: italic },
    underline: { visible: true, icon: underline },
    strikeThrough: { visible: true, icon: strikethrough },
    code: { visible: true, icon: code },
  },
  blockType: { visible: true, },
  fontSize: { visible: true, icon: 'xxx.png', },
  fontFamily: { visible: true, },
  list: {
    visible: true,
    inDropdown: true,
    unordered: { visible: true, icon: 'xxx.png', },
    ordered: { visible: true, icon: 'xxx.png', },
    indent: { visible: true, icon: 'xxx.png', },
    outdent: { visible: true, icon: 'xxx.png', }
  },
  textAlign: {
    visible: true,
    inDropdown: true,
    left: { visible: true, icon: 'xxx.png', },
    center: { visible: true, icon: 'xxx.png', },
    right: { visible: true, icon: 'xxx.png', },
    justify: { visible: true, icon: 'xxx.png', }
  },
  colorPicker: { visible: true, icon: 'xxx.png', },
  link: {
    visible: true,
    inDropdown: true,
    addLink: { visible: true, icon: 'xxx.png', },
    removeLink: { visible: true, icon: 'xxx.png', },
  },
  image: {
    visible: true,
    icon: 'xxx.png',
    fileUpload: true,
    url: true,
  },
  history: {
    visible: true,
    inDropdown: true,
    undo: { visible: true, icon: 'xxx.png', },
    redo: { visible: true, icon: 'xxx.png', },
  }
});
