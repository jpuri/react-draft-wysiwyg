import bold from '../../../images/bold.svg';
import italic from '../../../images/italic.svg';
import underline from '../../../images/underline.svg';
import strikethrough from '../../../images/strikethrough.svg';
import code from '../../../images/code.svg';
import fontSize from '../../../images/font-size.svg';
import indent from '../../../images/indent.svg';
import outdent from '../../../images/outdent.svg';
import ordered from '../../../images/list-ordered.svg';
import unordered from '../../../images/list-unordered.svg';
import left from '../../../images/align-left.svg';
import center from '../../../images/align-center.svg';
import right from '../../../images/align-right.svg';
import justify from '../../../images/align-justify.svg';
import color from '../../../images/color.svg';
import eraser from '../../../images/eraser.svg';
import link from '../../../images/link.svg';
import unlink from '../../../images/unlink.svg';
import image from '../../../images/image.svg';
import undo from '../../../images/undo.svg';
import redo from '../../../images/redo.svg';
import subscript from '../../../images/subscript.svg';
import superscript from '../../../images/superscript.svg';

/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
export default {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'],
    bold: { icon: bold },
    italic: { icon: italic },
    underline: { icon: underline },
    strikethrough: { icon: strikethrough },
    code: { icon: code },
    superscript: { icon: superscript },
    subscript: { icon: subscript },
  },
  fontSize: { icon: fontSize },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: unordered },
    ordered: { icon: ordered },
    indent: { icon: indent },
    outdent: { icon: outdent },
  },
  textAlign: {
    inDropdown: false,
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: left },
    center: { icon: center },
    right: { icon: right },
    justify: { icon: justify },
  },
  colorPicker: { icon: color },
  link: {
    inDropdown: false,
    options: ['link', 'unlink'],
    link: { icon: link },
    unlink: { icon: unlink },
  },
  image: { icon: image, uploadCallback: undefined },
  remove: { icon: eraser },
  history: {
    inDropdown: false,
    options: ['undo', 'redo'],
    undo: { icon: undo },
    redo: { icon: redo },
  },
};
