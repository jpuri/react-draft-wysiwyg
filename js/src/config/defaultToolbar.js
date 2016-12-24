import bold from '../../../images/bold.svg';
import italic from '../../../images/italic.svg';
import underline from '../../../images/underline.svg';
import strikethrough from '../../../images/strikethrough.svg';
import monospace from '../../../images/monospace.svg';
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
import emoji from '../../../images/emoji.svg';
import embedded from '../../../images/embedded.svg';
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
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    bold: { icon: bold, className: undefined },
    italic: { icon: italic, className: undefined },
    underline: { icon: underline, className: undefined },
    strikethrough: { icon: strikethrough, className: undefined },
    monospace: { icon: monospace, className: undefined },
    superscript: { icon: superscript, className: undefined },
    subscript: { icon: subscript, className: undefined },
  },
  blockType: {
    inDropdown: true,
    options: [ 'Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
    className: undefined,
    dropdownClassName: undefined
  },
  fontSize: { icon: fontSize, className: undefined },
  fontFamily: { className: undefined, dropdownClassName: undefined },
  list: {
    inDropdown: false,
    className: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: unordered, className: undefined },
    ordered: { icon: ordered, className: undefined },
    indent: { icon: indent, className: undefined },
    outdent: { icon: outdent, className: undefined },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: left, className: undefined },
    center: { icon: center, className: undefined },
    right: { icon: right, className: undefined },
    justify: { icon: justify, className: undefined },
  },
  colorPicker: { icon: color, className: undefined, popupClassName: undefined },
  link: {
    inDropdown: false,
    className: undefined,
    popupClassName: undefined,
    options: ['link', 'unlink'],
    link: { icon: link, className: undefined },
    unlink: { icon: unlink, className: undefined },
  },
  emoji: { icon: emoji, className: undefined, popupClassName: undefined },
  embedded: {
    icon: embedded,
    className: undefined,
    popupClassName: undefined,
  },
  image: {
    icon: image,
    className: undefined,
    popupClassName: undefined,
  },
  remove: { icon: eraser, className: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    options: ['undo', 'redo'],
    undo: { icon: undo, className: undefined },
    redo: { icon: redo, className: undefined },
  },
};
